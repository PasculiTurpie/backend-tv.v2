const User = require("../models/users.model");
const bycrypt = require("bcrypt")

module.exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
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
  const {name, email, password} = req.body;
  User.findOne({email}).then((user) =>{
    if(user){
      res.json({message:`Usuario ya existe con ese correo`})
    }else if(!name || !email || !password){
      return res.json({message:`Falta el nombre / correo / contraseña`})
    }else{
      bycrypt.hash(password, 10, (error, passwordHashed) =>{
        if(error) res.json({error});
        else{
          const newUser = new User({
            name,
            email,
            password :passwordHashed
          })
          newUser.save()
          .then((user)=>{
            res.json({message:`Usuario creado con éxito!`, user})
          })
          .catch((error) => console.error(error));
        }
      })
    }
  })
};
