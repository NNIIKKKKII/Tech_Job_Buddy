// src/services/application.service.ts
import { generateApplicationStrategy } from "../ai/application/strategy.ai.js";
import { generateCoverLetter } from "../ai/application/coverLetter.ai.js";


export const createCoverLetter = async (
    resumeText: string,
    jobDescription: string,
    explanation: any
) => {
    try {
        const response = await generateCoverLetter(resumeText, jobDescription, explanation);
        return response;
    } catch (error) {
        console.log(error);
        return "";
    }
};



export const getApplicationStrategy = async (
    similarity: number,
    explanation: any
) => {
    try {

        return await generateApplicationStrategy(similarity, explanation);
    } catch (error) {
        console.log(error);
        return "";
    }
};