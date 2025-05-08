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
    const { id, username, profilePicture, role } = user;
    const token = jwt.sign(
      { id: user.id, username: user.username, role:user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false /* process.env.NODE_ENV === "production" */,
        maxAge: 1000 * 60 * 60, // 1 hora
      })
      .json({
        token,
        message: "Usuario logueado correctamente",
        user: {
          id,
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

module.exports.logout = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.clearCookie("access_token");
      return res.json({
        email,
        message: `Sesión cerrada con éxito`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `No se ha podido cerrar sessión`,
    });
  }
};
