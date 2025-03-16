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

import {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  deleteUserValidator,
  updateLoggedUserValidator,
} from "../utils/Validatore/userValidator.js";

const router = express.Router();

router
  .route("/")
  .get(getUserValidator, getUsers)
  .post(uploadUserProfileImage, resizeUserProfileImage, createUser);
router
  .route("/:id")
  .get(getUserById)
  .put(uploadUserProfileImage, resizeUserProfileImage, updateUser)
  .delete(deleteUser);

export default router;
