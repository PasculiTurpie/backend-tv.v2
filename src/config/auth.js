const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso no autorizado. Token no encontrado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next(); // continua al siguiente middleware/controlador
  } catch (err) {
    return res.status(401).json({ message: `${err},Token inválido o expirado.` });
  }
};

module.exports = auth;
