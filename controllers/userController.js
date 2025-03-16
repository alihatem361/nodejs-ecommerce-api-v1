import User from "../models/userModel.js";
import {
  uploadSingleImage,
  resizeImage,
} from "../middlewares/uploadImageMiddleware.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";

// Middleware to upload user profile image
export const uploadUserProfileImage = uploadSingleImage("profileImg");

// Middleware to resize the uploaded user profile image
export const resizeUserProfileImage = resizeImage("users", 500, 500);

// ------------------- Create User -------------------
// Method: POST
// Path: /api/v1/users
// Access: Private (Admin)
// Description: Create a new user
export const createUser = createOne(User);

// ------------------- Get Users -------------------
// Method: GET
// Path: /api/v1/users
// Access: Private (Admin)
// Description: Get all users with pagination
export const getUsers = getAll(User, "Users");

// ------------------- Get User By ID -------------------
// Method: GET
// Path: /api/v1/users/:id
// Access: Private (Admin)
// Description: Get user by ID
export const getUserById = getOne(User);

// ------------------- Update User -------------------
// Method: PUT
// Path: /api/v1/users/:id
// Access: Private (Admin)
// Description: Update user by ID
export const updateUser = updateOne(User);

// ------------------- Delete User -------------------
// Method: DELETE
// Path: /api/v1/users/:id
// Access: Private (Admin)
// Description: Delete user by ID
// update this function to unactiove user not delet him
export const deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    active: false,
  }).select("-__v -password -role -active");
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
    data: user,
  });
};
