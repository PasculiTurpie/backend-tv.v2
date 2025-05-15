const Signal = require('../models/signal.model')

module.exports.createSignal = async (req, res) => {
    try {
        const signal = new Signal(req.body)
        await signal.save()
        res.status(200).json(signal)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:`Error al crear la señal`
        })
    }
}

module.exports.getSignal = async (req, res) =>{
  try {
    const signals = await Signal.find()
      .populate("contact")
      .populate("equipos.satelite")
      .populate("equipos.decoderIrd")
      .populate("equipos.conmutador")
      .populate("equipos.encoderTitan")
      .populate("equipos.dcm")
      .populate("equipos.dcmVmx")
      .populate("equipos.rtesVmx")
      .populate("equipos.routerAsr");

    res.status(200).json(signals);
  } catch (error) {
    console.error("Error al obtener señales:", error);
    res.status(500).json({ message: "Error al obtener señales" });
  }
}

module.exports.getIdSignal = async (req, res) => {
  try {
     const signal = await Signal.findById(req.params.id)
       .populate("contact")
       .populate("equipos.satelite")
       .populate("equipos.decoderIrd")
       .populate("equipos.conmutador")
       .populate("equipos.encoderTitan")
       .populate("equipos.dcm")
       .populate("equipos.dcmVmx")
       .populate("equipos.rtesVmx")
       .populate("equipos.routerAsr");
    res.status(200).json(signal);
  } catch (error) {
    console.error("Error al obtener señales:", error);
    res.status(500).json({ message: `Error al obtener señal` });
  }
};