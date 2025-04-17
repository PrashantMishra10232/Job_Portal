import pdf from "react-pdftotext";

async function pdfParse(resume) {

  try {
    const resumeText = await pdf(resume);
    // console.log("resumeText: ", resumeText);
    
    return resumeText.trim();
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
}

export default pdfParse;
