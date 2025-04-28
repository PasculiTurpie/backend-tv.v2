const bcrypt = require('bcrypt')
const User = require('../models/users.model')

module.exports.login = (req, res) =>{
    const {email, password} = req.body;
    User.findOne({email})
    .then((user)=>{
        if(!user){
            res.send({message:`Usuario no encontrado`})
        }
        return bcrypt.compare(password, user.password)
        .then((matched)=>{
            const {id, name, email} = user
            if(!matched){
                res.send({message:`Contraseña incorrecta`})
            }
            res.json({message:`Usuario logueado correctamente`,
                user:{
                    id,
                    name,
                    email
                }
            })
        })
        .catch((error)=>{
            res.status(401).send({message:error.message})
        })
    })
}