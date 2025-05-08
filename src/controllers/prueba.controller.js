const User = require("../models/users.model");

exports.getUser = (req, res, next) => {
  try {
    // Lógica...
    throw new Error("Usuario no encontrado");
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
  
}