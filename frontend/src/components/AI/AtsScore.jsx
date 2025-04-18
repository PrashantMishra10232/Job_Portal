import React, { useState } from "react";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { calculateScore } from "./scoreCalculator"
import pdfParse from "@/utils/pdfParse.js";

const ResumeAnalyzer = () => {
    const [rawFile, setRawFile] = useState(null); // For uploading
    const [fileText, setFileText] = useState(null); // For scoring
    const [feedback, setFeedback] = useState(null);
    const [jd, setJd] = useState({ description: "" });
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e) => {
        try {
            setLoading(true);
            const resume = e.target.files?.[0];
            if (resume && resume.type !== "application/pdf") {
                toast.error("Only PDF files are allowed");
                return;
            }
            setRawFile(resume);

            const text = await pdfParse(resume);
            // console.log("Resume Text", text);
            setFileText(text);
        } catch (error) {
            console.error("Error reading file:", error);
            toast.error("Error reading PDF file. Please try again.")
        }
        finally {
            setLoading(false);
        }
    };

    const changeDescriptionHandler = (e) => {
        const description = e.target.value;
        if (!description) {
            toast.error("You have a give a job description");
            return;
        }
        setJd({ [e.target.name]: description });

    };

    const handleUpload = async () => {
        if (!fileText) {
            toast.error("Please select a resume to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", rawFile);

        const result = calculateScore(fileText, jd.description)
        setFeedback(result);
    };

    return (
        <div className="bg-gradient-to-b from-purple-100 to-white">
            <Navbar />
            <div className="flex flex-col min-h-screen items-center pt-6">
                <h1 className="text-4xl font-bold text-purple-600">Analyze Your Resume</h1>
                <p className="text-xl text-gray-700 mt-2">See if your resume is job-ready</p>

                <div className="mt-8 w-full max-w-md bg-white shadow-xl rounded-xl p-6">
                    <div className="flex flex-col gap-2">
                        <Label className='text-md'>Resume</Label>
                        <input
                            type="file"
                            name="resume"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full border rounded p-2"
                        />
                        <Label className='text-md'>Job Description</Label>
                        <textarea
                            name='description'
                            onChange={changeDescriptionHandler}
                            className="border w-full rounded p-2"
                            placeholder="Enter/Paste the job description here"
                        />
                    </div>


                    <button
                        onClick={handleUpload}
                        className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                    >
                        Upload & Analyze
                    </button>

                    {feedback && typeof feedback === "object" && (
                        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
                            <h2 className="font-semibold mb-2">ATS Feedback:</h2>
                            <p><strong>Score:</strong> {feedback.score}%</p>
                            <div className="flex justify-between">
                                <div>
                                    <p className="mt-2"><strong>Matched Keywords:</strong></p>
                                    <ul className="list-disc pl-5">
                                        {feedback.matchedKeywords.map((word, idx) => <li key={idx}>{word}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <p><strong>Missing Keywords:</strong></p>
                                    <ul className="list-disc pl-5">
                                        {feedback.missingKeywords.map((word, idx) => <li key={idx}>{word}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div><span><strong className="text-blue-600">Suggestion:</strong> Try adding the missing keywords to your resume for a better score and better chance of getting your resume shortlisted</span></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalyzer;
