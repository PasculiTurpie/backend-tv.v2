const Equipo = require('../models/equipo.model');

module.exports.getEquipment = async (req, res) => {
  try {
    const equipo = await Equipo.find().sort({ nombreEquipment: 1 });
    res.json(equipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener equipo' });
  }
};

module.exports.getEquipmentById = async (req, res) => {
  try {
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json(equipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener equipo' });
  }
};

module.exports.postEquipment = async (req, res) => {
  try {
    const equipo = new Equipo(req.body);
    console.log(equipo)
    await equipo.save();
    res.json(equipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear equipo' });
  }
}

module.exports.updateEquipment = async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json(equipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar equipo' });
  }
}

module.exports.deleteEquipment = async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json({ message: 'Equipo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar equipo' });
  }
}