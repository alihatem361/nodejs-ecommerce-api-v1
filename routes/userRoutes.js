import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserProfileImage,
  resizeUserProfileImage,
} from "../controllers/userController.js";

const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .post(uploadUserProfileImage, resizeUserProfileImage, createUser);
router
  .route("/:id")
  .get(getUserById)
  .put(uploadUserProfileImage, resizeUserProfileImage, updateUser)
  .delete(deleteUser);

export default router;
