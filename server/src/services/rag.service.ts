// src/services/rag.service.ts

import { explainJobMatch } from "../ai/rag/explainMatch.ai.js";

export const getMatchExplanation = async (
    resume: string,
    job: string,
    similarity: number
) => {
    return await explainJobMatch(resume, job, similarity);
};