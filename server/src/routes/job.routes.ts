import { Router } from "express";
import { matchJobController, saveJobController } from "../controllers/job.controller.js";

const router = Router();

router.post("/save", saveJobController);
router.post("/match", matchJobController);

export default router;