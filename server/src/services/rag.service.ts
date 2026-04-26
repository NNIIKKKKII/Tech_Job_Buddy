import { explainJobMatch } from '../ai/rag/explainMatch.ai.js';



export const jobMatchRagService = async (resumeText: string, jobDescription: string, score: number) => {
    try {
        const response = await explainJobMatch(resumeText, jobDescription, score);
        return response;

    } catch (error) {
        console.log(`Error from service layer`, error)
        throw error;
    }
}