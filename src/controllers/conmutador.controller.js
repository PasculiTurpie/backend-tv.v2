const Conmutador = require("../models/conmutador.model");

module.exports.getConmutador = async (req, res) => {
  try {
    const conmutador = await Conmutador.find();
    res.json(conmutador);
  } catch (error) {
    console.log(error);
    res.send(404).json({ message: `Error al encontrar switch` });
  }
};
module.exports.getIdConmutador = async (req, res) => {
    try {
      const {id} = req.params
    const conmutador = await Conmutador.findById(id)
    res.json(conmutador);
  } catch (error) {
    console.log(error);
    res.send(404).json({ message: `Error al encontrar switch` });
  }
};
module.exports.createConmutador = async (req, res) => {
    try {
      const conmutador = new Conmutador(req.body);
    await conmutador.save();
    res.status(201).json(conmutador);
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

module.exports.deleteConmutador = async (req, res) => {
    try {
        const { id } = req.params;
        const conmutador = await Conmutador.findByIdAndDelete(id)
        res.status(200).json({message:"Elemento eliminado satisfactoriamente"});
    } catch (error) {
        res.status(500).json({message:"Error al eliminar elemento switch"})
    }
}

module.exports.updateConmutador = async (req, res) => {
    try {
        const { id } = req.params;
        const conmutador = await Conmutador.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.json(conmutador)
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar Switch" });
    }
}