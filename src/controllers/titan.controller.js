const Titan  = require('../models/titan.model');


module.exports.getTitan = async (req, res) =>{
    try {
        const titan = await Titan.find();
        res.json(
            { message:titan }
        )        
    } catch (error) {
        console.log(error)
        res.send(404).json({message:`Error al encontrar Titan`})
    }
}

module.exports.createtitan = async (req, res) => {
   const titan = new Titan(req.body);
   try {
    await titan.save();
    res.status(200).json(titan)
    
   } catch (error) {
    console.error(error)
    res.status(500).json({ message:`Error al crear Titan`})
   }
}