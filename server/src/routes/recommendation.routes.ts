// src/routes/recommendation.routes.ts

import { Router } from "express";
import { dailyRecommendationController } from "../controllers/recommendation.controller.js";

const router = Router();

router.post("/daily", dailyRecommendationController);

export default router;