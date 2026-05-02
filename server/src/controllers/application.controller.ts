import { Request, Response } from "express";
import { getApplicationStrategy } from "../services/application.service.js";
import { createCoverLetter } from "../services/application.service.js";

export const controllerCoverLetter = async (req: Request, res: Response) => {

    try {
        const { resumeText, jobDescription, explanation } = req.body;
        const letter = await createCoverLetter(resumeText, jobDescription, explanation);
        return res.status(200).json({
            coverLetter: letter
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate cover letter",
            error: error
        });
    }

};

// src/controllers/application.controller.ts


export const strategyController = async (req: Request, res: Response) => {
    try {
        const { similarity, explanation } = req.body;

        const result = await getApplicationStrategy(
            similarity,
            explanation
        );

        res.json(result);
    } catch {
        res.status(500).json({ error: "Strategy failed" });
    }
};