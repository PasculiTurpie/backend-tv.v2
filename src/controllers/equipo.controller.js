const Equipo = require('../models/equipo.model')

module.exports.createEquipo = async (req, res) => {
  try {
    const equipo = new Equipo(req.body)
    await equipo.save()
    
    res.status(200).json(equipo);
  } catch (error) {
    if (error.code === 11000) {
      const campoEnConflicto = Object.keys(error.keyValue)[0];
      const valorEnConflicto = error.keyValue[campoEnConflicto];
      const mensaje = `Ya existe un equipo con ${campoEnConflicto}: '${valorEnConflicto}'.`;
      return res.status(409).json({message: mensaje});
    }
    res.status(500).json({message:`Error al crear equipo`})
  }
}

module.exports.getEquipo = async (req, res) => {
  try {
    const equipo = await Equipo.find()
      .populate("tipoNombre")
      .sort({ nombre: 1 });
    res.json(equipo)
  } catch (error) {
    
    res.send(404).json({ message: `Error al encontrar equipos` });
  }
}

module.exports.getIdEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const equipo = await Equipo.findById(id).populate("tipoNombre");;
    if (!equipo)
      return res.status(404).json({ message: "Equipo no encontrado" });
    res.json(equipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener equipo" });
  }
}

module.exports.updateEquipo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    const equipo = await Equipo.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("tipoNombre");

    if (!equipo) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    res.json(equipo);
  } catch (error) {
    console.error("Error al actualizar equipo:", error);
    res.status(500).json({ message: "Error al actualizar equipo" });
  }
};


module.exports.deleteEquipo= async (req, res) => {
  
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo)
      return res.status(404).json({ message: "Equipo no encontrado" });
    res.json({ message: "equipo eliminado de la base de datos" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar equipo" });
  }
};