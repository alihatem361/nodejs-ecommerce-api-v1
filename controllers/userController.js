import User from "../models/userModel.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";

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
export const deleteUser = deleteOne(User);
