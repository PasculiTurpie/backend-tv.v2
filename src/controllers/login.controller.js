// controllers/auth.controller.js
const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }

    const { _id, username, profilePicture, role } = user;

    const token = jwt.sign(
      { id: _id, username, role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, // 1 día
      })
      .status(200)
      .json({
        token,
        message: "Usuario logueado correctamente",
        user: {
          id: _id,
          username,
          profilePicture,
          email,
          role,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
};

module.exports.logout = (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.json({ message: "Sesión cerrada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "No se ha podido cerrar sesión" });
  }
};

module.exports.profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)
  if (!userFound) return res.status(400).json({ message: "Usuartio no encontrado" })
  
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email:userFound.email
  });
  }