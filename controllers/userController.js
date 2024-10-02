import User from "../models/userModel.js";

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
