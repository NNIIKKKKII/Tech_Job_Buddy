import { Request, Response } from "express";
import { jobMatchRagService } from "../services/rag.service.js";

export const explainJobMatchController = async (req: Request, res: Response) => {
    try {
        const { resumeText, jobDescription, similarity } = req.body;

        const explanation = await jobMatchRagService(
            resumeText,
            jobDescription,
            similarity
        );

        res.json({ explanation });
    } catch (err) {
        console.error("RAG Controller Error:", err);
        res.status(500).json({ error: "Failed to generate explanation" });
    }
};