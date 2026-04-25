// src/routes/rag.routes.ts

import { Router } from "express";
import { explainMatchController } from "../controllers/rag.contoller.js";

const router = Router();

router.post("/explain", explainMatchController);

export default router;