import express from "express";
import { getCadUser } from "../controllers/cadUser.js";

const router = express.Router()

router.get("/", getCadUser);
export default router

