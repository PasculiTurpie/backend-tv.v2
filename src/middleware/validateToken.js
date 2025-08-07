const jwt = require("jsonwebtoken");

const authProfile = (req, res, next) => {
  const token = req.cookies.access_token;
  

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    req.userId = decoded.id; // ahora puedes acceder a req.user.id
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = { authProfile };