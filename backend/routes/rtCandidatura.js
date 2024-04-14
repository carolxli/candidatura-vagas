import express from "express";
import { addCand, deleteCand, getCand } from "../controllers/cadidatura.js";

const router = express.Router()

router.get("/", getCand)
router.post("/", addCand)
router.delete("/:id", deleteCand)

export default router

