// src/middleware/attachUserIfPresent.js
const jwt = require("jsonwebtoken");

function getToken(req) {
  // 1) Cookie
  if (req.cookies?.token) return req.cookies.token;
  // 2) Authorization: Bearer xxx
  const auth = req.headers?.authorization || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (m) return m[1];
  return null;
}

/**
 * Adjunta req.user si hay token válido, pero NO corta la request (no 401).
 * Útil para auditoría en rutas públicas o GETs.
 */
const attachUserIfPresent = (req, _res, next) => {
  try {
    const token = getToken(req);
    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Estructura mínima esperada en tus controladores
    req.user = {
      _id: decoded.id || decoded._id || decoded.userId || null,
      email: decoded.email || decoded.userEmail || decoded.username || null,
      role: decoded.role || null,
    };
  } catch (_e) {
    // token inválido/expirado → seguimos sin usuario
  }
  return next();
};

module.exports = { attachUserIfPresent };
