const jwt = require("jsonwebtoken");
require("dotenv").config();

const authProfile = (req, res, next) => {
  const token = req.cookies?.access_token;

  // Verificar si el token está presente
  if (!token) {
    return res
      .status(401)
      .json({ message: "No hay token, autorización denegada" });
  }

  // Verificar el token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }

    // Adjuntar la información del usuario decodificada al objeto req
    req.user = decoded;
    next();
  });
};

module.exports = { authProfile };
