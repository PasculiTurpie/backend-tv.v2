const Channel = require("../models/channel.model");

// Crear canal
module.exports.createChannel = async (req, res) => {
  try {
    const channel = new Channel(req.body);
    await channel.save();
    
    res.status(200).json(channel);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.values(error.keyValue).join(", ");
      return res.status(400).json({
        message: `Ya existe un canal con la misma combinación de ${field}`,
      });
    }
    console.error(error);
    res.status(501).json({ message: `Error al crear Canal`, error: error.message });
  }
};

// Obtener todos los canales
module.exports.getChannel = async (req, res) => {
  try {
    const channels = await Channel.find().populate('contact', 'tipoTecnologia');
    res.status(200).json(channels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los canales", error: error.message });
  }
};

// Obtener canal por ID
module.exports.getChannelId = async (req, res) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findById(id).populate('contact', 'tipoTecnologia');
    if (!channel) {
      return res.status(404).json({ message: "Canal no encontrado" });
    }
    res.status(200).json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el canal", error: error.message });
  }
};

// Actualizar canal
module.exports.updateChannel = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedChannel = await Channel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedChannel) {
      return res.status(404).json({ message: "Canal no encontrado para actualizar" });
    }
    res.status(200).json(updatedChannel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el canal", error: error.message });
  }
};

// Eliminar canal
module.exports.deleteChannel = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedChannel = await Channel.findByIdAndDelete(id);
    if (!deletedChannel) {
      return res.status(404).json({ message: "Canal no encontrado para eliminar" });
    }
    res.status(200).json({ message: "Canal eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el canal", error: error.message });
  }
};

/* UPDATE CHANNEL */

exports.updateChannelFlow = async (req, res) => {
  try {
    const { nodes, edges } = req.body;
    const updatedChannel = await Channel.findByIdAndUpdate(
      req.params.id,
      { nodes, edges },
      { new: true }
    );
    res.json(updatedChannel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};