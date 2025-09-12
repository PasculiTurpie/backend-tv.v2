// src/middleware/attachUserIfPresent.js
const jwt = require("jsonwebtoken");

function extractToken(req) {
  // 1) cookie
  if (req.cookies?.token) return req.cookies.token;

  // 2) Authorization: Bearer <token>
  const auth = req.headers?.authorization || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}

function attachUserIfPresent(req, _res, next) {
  try {
    const token = extractToken(req);
    if (!token) return next();

    const dec = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      _id: dec.id || dec._id || dec.userId || null,
      email: dec.email || dec.userEmail || dec.username || null,
      role: dec.role || null,
    };

    return next();
  } catch (_e) {
    // Si falla el token, seguimos sin usuario (NO devolvemos 401 aquí)
    return next();
  }
}

module.exports = { attachUserIfPresent };