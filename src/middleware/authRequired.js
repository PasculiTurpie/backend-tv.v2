// middlewares/authRequired.js
const jwt = require("jsonwebtoken");

require("dotenv").config();

function authRequired(req, res, next) {
  try {
    // 1) Leer access token DESDE COOKIE (httpOnly)
    const token = req.cookies?.access_token;

    if (!token) {
      // No hay cookie -> no hay sesión
      return res.status(401).json({ error: "no_token" });
    }

    // 2) Verificar firma y expiración
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // 3) Inyectar identidad en req.user
    //    Incluimos los campos más usados; ajusta si guardas más en el access token
    req.user = {
      _id: decoded.id || decoded._id,
      id: decoded.id || decoded._id, // por compatibilidad
      email: decoded.email,
      role: decoded.role,
    };

    // 4) Continuar
    return next();
  } catch (err) {
    // Firmas/expiración
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({ error: "token_expired" });
    }
    return res.status(401).json({ error: "invalid_token" });
  }
}

module.exports = { authRequired };
