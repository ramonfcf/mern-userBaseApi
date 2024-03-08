const userModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users: " + error.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, birthdate } = req.body;

  try {
    const user = await userModel.create({ name, email, birthdate });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user: " + error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found: " + error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Error updating user: " + error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found: " + error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
