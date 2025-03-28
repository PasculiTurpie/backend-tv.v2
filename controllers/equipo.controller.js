const Equipo = require('../models/equipo.model');

module.exports.getEquipment = async (req, res) => {
  try {
    const equipo = await Equipo.find().sort({ nombreEquipment: 1 });
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener equipo' });
  }
};

module.exports.postEquipment = async (req, res) => {
  try {
    const equipo = new Equipo(req.body);
    await equipo.save();
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear equipo' });
  }
}