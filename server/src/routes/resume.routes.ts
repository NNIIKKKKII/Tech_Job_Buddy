import { Router } from "express";
import { parseResumeController } from "../controllers/resume.controller.js";
const router = Router();

router.get("/test", (req, res) => {
    res.json({ message: "Resume route working" });
});

router.post("/parse", parseResumeController);




export default router;