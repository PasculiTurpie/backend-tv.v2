const jwt = require("jsonwebtoken");

const authProfile = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ahora puedes acceder a req.user.id
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = { authProfile };