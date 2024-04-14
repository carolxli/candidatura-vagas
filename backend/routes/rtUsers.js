import express from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router()

router.get("/:userid", getUsers)
router.post("/", addUser)
router.put("/:userid", updateUser);
router.delete("/:userid", deleteUser)

export default router

