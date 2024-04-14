import express from "express";
import { getVagas } from "../controllers/vagas.js";

const router = express.Router();

router.get("/", getVagas);

export default router;
