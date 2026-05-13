export const calculateScore = function () {
    throw new Error("Keyword-based ATS scoring has been removed. Use /api/v1/application/ats-score instead.");
}

export const extractedKeywords = function () {
    throw new Error("Keyword extraction has been removed. ATS analysis now runs through the backend OpenAI endpoint.");
}
