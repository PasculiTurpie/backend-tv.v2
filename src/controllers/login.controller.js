const bcrypt = require("bcrypt");
const User = require("../models/users.model");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }

    const { id, username, profilePicture, role } = user;
    res.json({
      message: "Usuario logueado correctamente",
      user: {
        id,
          username,
        profilePicture,
        email,
        role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
};
