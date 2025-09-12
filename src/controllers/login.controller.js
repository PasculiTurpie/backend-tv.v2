// controllers/auth.controller.js
const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || process.env.SECRET_KEY; // 👈 unificar

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).send({ message: "Usuario no encontrado" });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched)
      return res.status(401).send({ message: "Contraseña incorrecta" });

    const { _id, username, role } = user;

    // Firma SIEMPRE con el mismo secreto que validas
    const token = jwt.sign(
      { id: _id, email: user.email, username, role }, // incluye email por conveniencia
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Para autoAudit de esta request
    req.user = { _id: user._id, email: user.email, role: user.role };

    return res.json({
      ok: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
};

module.exports.logout = (req, res) => {
  try {
    // 👇 limpia la MISMA cookie que usas en login
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return res.json({ message: "Sesión cerrada con éxito" });
  } catch (error) {
    console.error("Error en logout:", error);
    return res.status(500).json({ message: "No se ha podido cerrar sesión" });
  }
};

module.exports.profile = async (req, res) => {
  try {
    // authProfile ya pone req.user._id
    const user = await User.findById(req.user._id).select("-password").lean();
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Devuelve exactamente lo que el frontend espera
    return res.json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el perfil" });
  }
};
