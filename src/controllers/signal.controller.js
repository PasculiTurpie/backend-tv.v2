const Signal = require('../models/signal.model')

module.exports.createSignal = async (req, res) => {
    try {
        const signal = new Signal(req.body)
        await signal.save()
        res.status(200).json(signal)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:`Señal creada`
        })
    }
}

module.exports.getSignal = async (req, res) =>{
    try {
        const signal = await Signal.find().populate('satelite')
      .populate('contact')
      .populate('equipos.decoderIrd')
      .populate('equipos.conmutador')
      .populate('equipos.encoderTitan')
      .populate('equipos.dcm')
      .populate('equipos.dcmVmx')
      .populate('equipos.rtesVmx')
      .populate('equipos.routerAsr');
        res.json(signal)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:`Error al obtener señal`})
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
    res.json(signal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error al obtener señal` });
  }
};