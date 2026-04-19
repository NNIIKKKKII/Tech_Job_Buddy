import { Router } from "express";
import { parseResumeController, improveResumeController, scoreResumeController } from "../controllers/resume.controller.js";
const router = Router();

router.get("/test", (req, res) => {
    res.json({ message: "Resume route working" });
});

router.post("/parse", parseResumeController);
router.post("/improve", improveResumeController);
router.post("/score", scoreResumeController);



export default router;