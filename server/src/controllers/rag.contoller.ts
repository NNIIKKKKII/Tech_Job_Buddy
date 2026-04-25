// src/controllers/rag.controller.ts

import { Request, Response } from "express";
import { getMatchExplanation } from "../services/rag.service.js";

export const explainMatchController = async (req: Request, res: Response) => {
    try {
        const { resumeText, jobDescription, similarity } = req.body;

        const explanation = await getMatchExplanation(
            resumeText,
            jobDescription,
            similarity
        );

        res.json({ explanation });
    } catch (err) {
        res.status(500).json({ error: "Failed to generate explanation" });
    }
};