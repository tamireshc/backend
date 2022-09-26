const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const checkUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { type, message } = await userService.checkUser(email, password);
    if (type) {
      return res.status(400).json({ message });
    }

    const token = jwt.sign({ data: { email } }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    const { type, message } = await userService.createUser(req.body);
    if (type) {
      return res.status(409).json({ message });
    }
    const token = jwt.sign({ data: { email } }, secret, jwtConfig);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { message } = await userService.getAllUsers();
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const { type, message } = await userService.getUserById(Number(id));

    if (type) {
      return res.status(404).json({ message });
    }
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  const email = req.user;
  try {
    await userService.deleteUser(email);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  checkUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
}; 