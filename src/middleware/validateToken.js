const jwt  = require("jsonwebtoken");
require("dotenv").config();
const authProfile = (req, res, next) => {

  const token = req.cookies.access_token;

  if(!token)
    return res.status(401).json({ message: "No hay token, autorización denegada" })
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' })
    
    req.user = user
  next()
  });
};

module.exports = { authProfile };
