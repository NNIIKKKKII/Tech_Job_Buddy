import { Router } from "express";
import { controllerCoverLetter, strategyController } from "../controllers/application.controller.js";

const router = Router();

router.post("/cover-letter", controllerCoverLetter);
router.post("/strategy", strategyController);

export default router;