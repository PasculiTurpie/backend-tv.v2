const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const JWT_SECRET = process.env.JWT_SECRET || process.env.SECRET_KEY; // 👈

function getTokenFromReq(req) {
  const h = req.headers?.authorization || req.headers?.Authorization;
  if (typeof h === "string" && h.startsWith("Bearer "))
    return h.slice(7).trim();
  if (req.cookies?.token) return req.cookies.token;
  if (req.headers?.["x-access-token"]) return req.headers["x-access-token"];
  return null;
}

async function authProfile(req, res, next) {
  try {
    const token = getTokenFromReq(req);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, JWT_SECRET);
    const uid = payload._id || payload.id || payload.sub;
    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(uid).lean();
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = {
      _id: user._id,
      email: user.email || payload.email || null,
      role: user.role || payload.role || null,
      username: user.username || payload.username || null,
      profilePicture: user.profilePicture || null,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { authProfile };