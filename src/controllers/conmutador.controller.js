const Conmutador  = require('../models/conmutador.model');


module.exports.getConmutador = async (req, res) =>{
    try {
        const conmutador = await Conmutador.find();
        res.json(
            { message:conmutador }
        )        
    } catch (error) {
        console.log(error)
        res.send(404).json({message:`Error al encontrar switch`})
    }
}

module.exports.createConmutador = async (req, res) => {
   const conmutador = new Conmutador(req.body);
   try {
    await conmutador.save();
    res.status(200).json(conmutador)
    
   } catch (error) {
    console.error(error)
    res.status(500).json({ message:`Error al crear Switch`})
   }
}