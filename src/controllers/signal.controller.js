const Signal = require("../models/signal.model");

module.exports.createSignal = async (req, res) => {
  try {
    const signal = new Signal(req.body);
    await signal.save();
    res.status(200).json(signal);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error al crear la señal`,
    });
  }
};

module.exports.getSignal = async (req, res) => {
  try {
    const signals = await Signal.find().populate("contact");
    res.status(200).json(signals);
  } catch (error) {
    console.error("Error al obtener señales:", error);
    res.status(500).json({ message: "Error al obtener señales" });
  }
};

module.exports.getIdSignal = async (req, res) => {
  try {
    const signal = await Signal.findById(req.params.id).populate("contact");
    res.status(200).json(signal);
  } catch (error) {
    console.error("Error al obtener señales:", error);
    res.status(500).json({ message: `Error al obtener señal` });
  }
};

module.exports.updateSignal = async (req, res) => {
  try {
    const { id } = req.params;
    const { contact } = req.body;

    const signal = await Signal.findById(id);
    if (!signal)
      return res.status(404).json({ message: "No se encontró la señal" });

    // Verificar si el contacto ya está asignado
    const alreadyAssigned = signal.contact.some((c) =>
      contact.includes(c.toString())
    );
    if (alreadyAssigned) {
      return res
        .status(409)
        .json({ message: "Contacto ya asignado previamente" });
    }

    const updatedSignal = await Signal.findByIdAndUpdate(
      id,
      { $addToSet: { contact: { $each: contact } } },
      { new: true }
    );

    res.status(200).json({
      message: "Contacto(s) asignado correctamente",
      data: updatedSignal,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


module.exports.deleteSignal = async (req, res) => {
  try {
    const { id } = req.params;
    const signalTv = await Signal.findByIdAndDelete(id);
    if (!signalTv) {
      return res.status(404).json({ message: "Elemento no encontrado" });
    }
    res.status(200).json({ message: "Elemento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar elemento:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
