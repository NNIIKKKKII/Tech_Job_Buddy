import { Router } from "express";
import { explainJobMatchController } from "../controllers/rag.contoller.js";

const router = Router();

router.post("/explain", explainJobMatchController);

export default router;