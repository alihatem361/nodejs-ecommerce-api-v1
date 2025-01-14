import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUser);

// get all users
router.get("/users", getUsers);

export default router;
