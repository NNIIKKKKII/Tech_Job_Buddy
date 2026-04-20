import { Router, Request, Response } from "express";
import { parseResumeController, improveResumeController, scoreResumeController, saveResumeController } from "../controllers/resume.controller.js";
import { createEmbedding } from "../ai/core/embedding.js";
const router = Router();

router.get("/test", (req, res) => {
    res.json({ message: "Resume route working" });
});

router.post("/parse", parseResumeController);
router.post("/improve", improveResumeController);
router.post("/score", scoreResumeController);
router.post("/save", saveResumeController)


//Test Route
router.post("/embedding", async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text/Resume NOT FOUND !" });
        }
        const vector = await createEmbedding(text);
        res.status(200).json({ length: vector.length, sample: vector.slice(0, 5) });
    } catch (error) {
        console.error("Embedding Error:", error);
        res.status(500).json({ error: "Failed to generate embedding" });
    }
});


export default router;