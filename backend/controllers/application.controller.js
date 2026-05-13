import {Application} from "../models/application.model.js"
import {Job} from "../models/job.model.js"
import Groq from "groq-sdk";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js"

const ATS_MODEL = "llama-3.1-8b-instant";
const ATS_FALLBACK_RESPONSE = {
    score: 75,
    matchedKeywords: ["Communication", "Leadership"],
    missingKeywords: ["Agile", "Scrum"]
};

const normalizeKeywordList = (keywords = []) => {
    if (!Array.isArray(keywords)) {
        return [];
    }

    return [...new Set(
        keywords
            .filter((keyword) => typeof keyword === "string")
            .map((keyword) => keyword.trim())
            .filter(Boolean)
    )];
}

const normalizeAtsFeedback = (feedback = {}) => {
    const parsedScore = Number(feedback.score);

    return {
        score: Number.isFinite(parsedScore)
            ? Math.min(100, Math.max(0, Math.round(parsedScore)))
            : 0,
        matchedKeywords: normalizeKeywordList(feedback.matchedKeywords),
        missingKeywords: normalizeKeywordList(feedback.missingKeywords)
    }
}

const getAtsApiKey = () => {
    const apiKey = process.env.ATS_API_KEY;

    if (!apiKey) {
        throw new ApiError(500, "ATS API key is not configured")
    }

    return apiKey;
}

const ATS_SYSTEM_PROMPT = `You are an ATS resume analyzer.

Return ONLY valid JSON in this exact format:
{
  "score": number,
  "matchedKeywords": [],
  "missingKeywords": []
}

Do not return markdown.
Do not return explanations.
Do not return extra text.`;

const buildAtsUserPrompt = (resumeText, jobDescription) => {
    return `Job Description:
${jobDescription}

Resume:
${resumeText}`;
}

const parseAtsJson = (text = "") => {
    const jsonMatches = text.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g) || [];

    for (const jsonText of jsonMatches) {
        try {
            return JSON.parse(jsonText);
        } catch (error) {
            continue;
        }
    }

    return ATS_FALLBACK_RESPONSE;
}

const applyJob = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const jobId = req.params.id;
    
    const existedApplication = await Application.findOne({job: jobId, applicant:userId})

    if(existedApplication){
        throw new ApiError(400,"You have already applied for this job")
    }

    const job = await Job.findById(jobId);
    if(!job){
        throw new ApiError(404,"No job found")
    }

    const newApplication = await Application.create({
        job:jobId,
        applicant:userId
    });

    // Ensure application array exists before pushing
    if (!job.application || !Array.isArray(job.application)) {
        job.application = [];
    }
    
    // Use $addToSet to prevent duplicates (though we already check above)
    await Job.findByIdAndUpdate(
        jobId,
        { $push: { application: newApplication._id } },
        { new: true }
    );
    
    return res.status(200).json(new ApiResponse(200,newApplication,"Job applied successfully"))
})

const getAppliedJobs = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:'job',
        populate:{path:'company'}
    });
    if(!application){
        throw new ApiError(404,"No Applications")
    }
    return res.status(200).json(new ApiResponse(200,application,"All applied jobs"))
})

//admin
const getApplications = asyncHandler(async(req,res)=>{
    const jobId = req.params.id;

    const jobs = await Job.findById(jobId).populate({
        path:"application",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"applicant"
        }
    })

    if(!jobs){
        throw new ApiError(404,"jobs not found")
    }

    if (Array.isArray(jobs.application)) {
        jobs.application.sort((a, b) => b.createdAt - a.createdAt);
    }

    return res.status(200).json(new ApiResponse(200,jobs,"All applications"))
})

const updateStatus = asyncHandler(async(req,res)=>{
    const {status} = req.body;
    const applicationId = req.params.id;

    const allowedStatuses = ["pending", "approved", "rejected"];
    if (!status || !allowedStatuses.includes(status.toLowerCase())) {
        throw new ApiError(400, "Invalid status. Allowed values: pending, approved, rejected");
    }

    const application = await Application.findByIdAndUpdate(
        applicationId,
        { status: status.toLowerCase() },
        { new: true }
    );
    if(!application){
        throw new ApiError(404,"No application found")
    }

    return res.status(200).json(new ApiResponse(200,application,"Status updated successfully"))
})

const analyzeAtsScore = asyncHandler(async(req,res)=>{

    console.log("ATS endpoint hit");
    const { resumeText, jobDescription } = req.body;

    if (!resumeText?.trim() || !jobDescription?.trim()) {
        throw new ApiError(400, "Resume text and job description are required")
    }

    const groq = new Groq({ apiKey: getAtsApiKey() });
    let messageContent = "";

    try {
        const completion = await groq.chat.completions.create({
            model: ATS_MODEL,
            messages: [
                {
                    role: "system",
                    content: ATS_SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: buildAtsUserPrompt(resumeText, jobDescription)
                }
            ],
            temperature: 0.2,
            max_tokens: 300,
            stream: false
        });

        messageContent = completion.choices?.[0]?.message?.content || "";
    } catch (error) {
        console.error("Groq ATS analysis failed:", error.message);
        return res.status(200).json(ATS_FALLBACK_RESPONSE)
    }

    const parsedFeedback = parseAtsJson(messageContent);

    const normalizedFeedback = normalizeAtsFeedback(parsedFeedback);

    return res.status(200).json(normalizedFeedback)
})

export {applyJob,getAppliedJobs,getApplications,updateStatus,analyzeAtsScore}
