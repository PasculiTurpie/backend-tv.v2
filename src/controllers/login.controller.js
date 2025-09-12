// controllers/auth.controller.js
const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

    const token = jwt.sign(
      // 👇 incluye email en el payload para que autoAudit pueda leerlo del token si hace falta
      { id: _id, username, role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax", // en local usa 'lax' (None requiere Secure)
      secure: isProd, // true solo en https (prod)
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // útil para autoAudit del login
    req.user = { _id: user._id, email: user.email, role: user.role };

    return res.json({
      ok: true,
      token,
      user: { id: user._id, email: user.email, role: user.role },
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
    // 👇 tu middleware setea req.user, no req.userId
    const id = req.user?._id || req.user?.id;
    if (!id) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el perfil" });
  }
};