const User = require("../models/users.model");
const bcrypt = require("bcrypt");

module.exports.getAllUser = async (req, res) => {
  try {
    console.log("Buscando usuarios...");
    const users = await User.find().sort({ name: 1 });
    console.log("Usuarios encontrados, enviando respuesta");
    return res.json(users);
  } catch (error) {
    console.error("Error capturado en catch:", error.message);
    return res.status(500).json({ message: "Error al obtener usuarios" });
  }
};


module.exports.getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validar campos requeridos antes de consultar a la base de datos
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Falta el nombre, correo o contraseña" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Usuario ya existe con ese correo" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "Usuario creado con éxito!",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: `Usuario no encontrado` });
    res.json({ message: "Usuario eliminado de la Base de datos" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};



module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Ejecuta las validaciones del modelo
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Usuario actualizado exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};
