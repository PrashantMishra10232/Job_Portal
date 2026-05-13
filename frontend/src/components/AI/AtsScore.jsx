import React, { useState } from "react";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import pdfParse from "@/utils/pdfParse.js";
import axiosInstance from "@/utils/axiosInstance";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { AlertCircle, CheckCircle2, FileText, Sparkles, UploadCloud } from "lucide-react";

const ResumeAnalyzer = () => {
    const [fileText, setFileText] = useState(null); // For scoring
    const [feedback, setFeedback] = useState(null);
    const [jd, setJd] = useState({ description: "" });
    const [loading, setLoading] = useState(false);
    const [resumeFileName, setResumeFileName] = useState("");

    const handleFileChange = async (e) => {
        try {
            setLoading(true);
            const resume = e.target.files?.[0];
            if (!resume) {
                return;
            }

            if (resume && resume.type !== "application/pdf") {
                toast.error("Only PDF files are allowed");
                setResumeFileName("");
                return;
            }

            const text = await pdfParse(resume);
            // console.log("Resume Text", text);
            setFileText(text);
            setResumeFileName(resume.name);
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

        if (!jd.description?.trim()) {
            toast.error("You have a give a job description");
            return;
        }

        try {
            setLoading(true);
            const res = await axiosInstance.post(
                `${APPLICATION_API_ENDPOINT}/ats-score`,
                {
                    resumeText: fileText,
                    jobDescription: jd.description
                },
                { withCredentials: true }
            );

            setFeedback(res.data);
        } catch (error) {
            console.error("Error analyzing resume:", error);
            toast.error(error?.response?.data?.message || "Failed to analyze resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white">
            <Navbar />
            <main className="px-4 py-12 md:py-16">
                <section className="mx-auto max-w-6xl">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-2">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-[#6A38C2] font-semibold text-sm shadow-sm border border-purple-200/50">
                                <Sparkles className="w-4 h-4" />
                                Check-ATS
                            </span>
                        </div>
                        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                            Analyze Your <span className="bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] bg-clip-text text-transparent">Resume</span>
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            See how closely your resume matches a job description before you apply.
                        </p>
                    </div>

                    <div className="mt-10 md:mt-12 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border border-purple-100/70 overflow-hidden">
                        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="p-6 sm:p-8 md:p-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 rounded-xl bg-purple-100 text-[#6A38C2]">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Resume Match Check</h2>
                                        <p className="text-sm text-gray-500 mt-1">PDF resume and job description</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-gray-700">Resume</Label>
                                        <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/50 px-4 py-6 text-center transition-colors hover:border-[#6A38C2] hover:bg-purple-50">
                                            <UploadCloud className="h-8 w-8 text-[#6A38C2]" />
                                            <span className="mt-3 max-w-full truncate text-sm font-semibold text-gray-800">{resumeFileName || "Upload PDF Resume"}</span>
                                            <span className="mt-1 text-xs text-gray-500">PDF only</span>
                                            <input
                                                type="file"
                                                name="resume"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                                className="sr-only"
                                            />
                                        </label>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-gray-700">Job Description</Label>
                                        <textarea
                                            name="description"
                                            onChange={changeDescriptionHandler}
                                            className="min-h-44 w-full resize-y rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#6A38C2] focus:ring-4 focus:ring-purple-100"
                                            placeholder="Enter/Paste the job description here"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleUpload}
                                    className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] px-8 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:from-[#5a2fa8] hover:to-[#7a4cd6] hover:shadow-xl"
                                >
                                    <Sparkles className="h-5 w-5" />
                                    {loading ? "Analyzing..." : "Upload & Analyze"}
                                </button>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6 sm:p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-purple-100/70">
                                <div className="h-full rounded-2xl bg-white shadow-lg border border-purple-100 p-6">
                                    {feedback && typeof feedback === "object" ? (
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-sm font-semibold text-[#6A38C2]">ATS Feedback</p>
                                                <div className="mt-3 flex items-end gap-2">
                                                    <span className="text-5xl font-extrabold text-gray-900">{feedback.score}</span>
                                                    <span className="pb-2 text-lg font-semibold text-gray-500">%</span>
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                                                <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                                                        <CheckCircle2 className="h-5 w-5" />
                                                        Matched Keywords
                                                    </div>
                                                    <ul className="mt-3 space-y-2 text-sm text-green-800">
                                                        {feedback.matchedKeywords.map((word, idx) => (
                                                            <li key={idx} className="rounded-full bg-white px-3 py-1.5 shadow-sm">{word}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                                                    <div className="flex items-center gap-2 text-amber-700 font-semibold">
                                                        <AlertCircle className="h-5 w-5" />
                                                        Missing Keywords
                                                    </div>
                                                    <ul className="mt-3 space-y-2 text-sm text-amber-800">
                                                        {feedback.missingKeywords.map((word, idx) => (
                                                            <li key={idx} className="rounded-full bg-white px-3 py-1.5 shadow-sm">{word}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-sm text-blue-800 leading-relaxed">
                                                <strong className="text-blue-700">Suggestion:</strong> Try adding the missing keywords to your resume for a better score and better chance of getting your resume shortlisted
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                                            <div className="rounded-2xl bg-purple-100 p-4 text-[#6A38C2]">
                                                <FileText className="h-10 w-10" />
                                            </div>
                                            <h2 className="mt-5 text-2xl font-bold text-gray-900">ATS Feedback</h2>
                                            <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
                                                Your match score and keyword breakdown will appear here.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ResumeAnalyzer;
