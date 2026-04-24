import { Router } from "express";
import { matchJobsController, saveJobController } from "../controllers/job.controller.js";

const router = Router();

router.post("/save", saveJobController);
router.post("/match", matchJobsController);

export default router;