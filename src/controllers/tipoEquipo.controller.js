const TipoEquipo = require('../models/tipoEquipo')


module.exports.getTipoEquipo = async (req, res) => {
  try {
    const tipoEquipo = await TipoEquipo.find();
    res.json(tipoEquipo);
  } catch (error) {
    console.log(error);
    res.send(404).json({ message: `Error al encontrar Tipo Equipo` });
  }
}

module.exports.createTipoEquipo = async (req, res) => {
    try {
      const tipoEquipo = new TipoEquipo(req.body);
    await tipoEquipo.save();
    res.status(201).json(tipoEquipo);
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.values(error.keyValue).join(", ");
            console.log(field);
          return res.status(400).json({
            message: `Ya existe el switch ${field}`
          });
        }
    console.error(error);
    res.status(500).json({ message: `Error al crear Switch` });
  }
};