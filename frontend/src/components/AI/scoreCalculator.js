export const calculateScore = function(resumeText,jobDescription){
    const keywords = extractedKeywords(jobDescription);

    const lowerResumeText = resumeText.toLowerCase();

    const matchedKeywords = keywords.filter(keyword=>
        lowerResumeText.includes(keyword.toLowerCase())
    )

    const missingKeywords = keywords.filter(keyword=>
        !lowerResumeText.includes(keyword.toLowerCase())
    )

    //caluculate score
    const score = Math.round((matchedKeywords.length/keywords.length)*100);

    return {
        score,
        matchedKeywords,
        missingKeywords
    }
}

export const extractedKeywords = function(jobDescription){

    //convert to lowercase and remove special characters
    const cleanText = jobDescription.toLowerCase().replace(/[^\w\s]/g, '');

    //split into words
    const words = cleanText.split(/\s+/);

    //filter common words and short terms
    const commonWords = new Set(['and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', "other", "will", "written", "create", "what"])
    const keywords = words.filter(word=>word.length>2 && !commonWords.has(word))

    //count frequency and get unique words
    const frequency= {};

    //count word frequency
    keywords.forEach(word=>{
        frequency[word] = (frequency[word] || 0) + 1
    });

    return Object.entries(frequency)
    .sort(([,a],[,b])=>b-a)//sort by freequency
    .slice(0,50)//get top 50
    .map(([word])=>word) //return only the words

}