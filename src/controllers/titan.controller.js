const Titan  = require('../models/titan.model');


module.exports.getTitan = async (req, res) =>{
    try {
        const titan = await Titan.find();
        res.json(titan)        
    } catch (error) {
        console.log(error)
        res.send(404).json({message:`Error al encontrar Titan`})
    }
}

module.exports.getIdTitan = async (req, res) => {
    try {
        const id = req.params.id;
        const titanId = await Titan.findById(id);
        res.json(titanId);
    } catch (errror) {
        res.status(500).json({ message: "Error al obtener Titan" }); 
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

module.exports.deleteTitan = async (req, res) => {
  try {
    const id = req.params.id;
    const titan = await Titan.findByIdAndDelete(id);
    if (!titan)
      return res.status(404).json({ message: `Equipo no encontrado` });
    res.json({ message: "Titan eliminado de la base de datos" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar Titan" });
  }
};


module.exports.updateTitan = async (req, res) => {
  try {
    const id = req.params.id;
    const titan = await Titan.findByIdAndUpdate(id, req.body, { new: true });
    res.json(titan);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar Titan" });
  }
};
