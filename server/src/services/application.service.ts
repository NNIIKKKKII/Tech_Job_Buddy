// src/services/application.service.ts

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