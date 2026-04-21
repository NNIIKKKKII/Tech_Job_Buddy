import { Router } from "express";
import { saveJobController } from "../controllers/job.controller.js";

const router = Router();

router.post("/save", saveJobController);

export default router;