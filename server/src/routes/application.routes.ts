import { Router } from "express";
import { controllerCoverLetter } from "../controllers/application.controller.js";

const router = Router();

router.post("/cover-letter", controllerCoverLetter);

export default router;