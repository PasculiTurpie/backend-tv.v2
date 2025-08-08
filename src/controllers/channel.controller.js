const Channel = require("../models/channel.model");

// Crear canal
module.exports.createChannel = async (req, res) => {
  try {
    const channel = new Channel(req.body);
    await channel.save();
    res.status(201).json(channel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los canales
module.exports.getChannel =  async (req, res) => {
  try {
    const channels = await Channel.find().populate('signal');
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports.updateChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { signal, nodes, edges } = req.body;

    // Actualiza el documento Channel
    const updated = await Channel.findByIdAndUpdate(
      id,
      { signal, nodes, edges },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Channel no encontrado" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





/* +++++++++++++++++++++++++++++++ */

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