import User from "../models/userModel.js";

// Create a new user
export const createUser = async (req, res) => {
  const { name, email, age } = req.body;
  const newUser = new User({ name, email, age });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
