// src/controllers/recommendation.controller.ts

import { Request, Response } from "express";
import { getDailyRecommendations } from "../services/recommendation.service.js";

export const dailyRecommendationController = async (req: Request, res: Response) => {
    try {
        const { resumeId } = req.body;

        if (!resumeId) {
            return res.status(400).json({ error: "resumeId required" });
        }

        const result = await getDailyRecommendations(resumeId);

        res.json(result);
    } catch {
        res.status(500).json({ error: "Failed to get recommendations" });
    }
};