import { Router } from "express";
import { parseResumeController, improveResumeController } from "../controllers/resume.controller.js";
const router = Router();

router.get("/test", (req, res) => {
    res.json({ message: "Resume route working" });
});

router.post("/parse", parseResumeController);
router.post("/improve", improveResumeController);



export default router;