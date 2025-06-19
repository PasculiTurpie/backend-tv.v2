const RtesVmx = require('../models/rtesVmx.model')

module.exports.createRtesVmx = async (req, res) => {
    try {
        const rtesVmx = new RtesVmx(req.body)
        await rtesVmx.save()
        res.status(200).json(rtesVmx)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:`Error al crear rtesVmx`
        })
    }
}

module.exports.getRtesVmx = async (req, res) =>{
    try {
        const rtesVmx = await RtesVmx.find()
        res.json(rtesVmx)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:`Error al obtener el equipo`})
    }
}

module.exports.getIdRtesVmx = async (req, res) =>{
    try {
        const id = req.params.id;
        const rtesVmx = await RtesVmx.findById(id)
        res.json(rtesVmx)
        
    } catch (error) {
        res.status(500).json({message:"Error al obtener Rtes Vmx"})
    }
}

module.exports.deleteRtesVmx = async(req, res) =>{
    try {
        const id = req.params.id;
        const rtesVmx = await RtesVmx.findByIdAndDelete(id);
        if(!rtesVmx)
            return res.status(404).json({message:"Elemento no encontrado"})
        res.json({message:"Elemento eliminado de la base de datos"})
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar Rtes Vmx" });  
    }
}

module.exports.updateTitan = async (req, res) => {
  try {
    const id = req.params.id;
    const rtesVmx = await RtesVmx.findByIdAndUpdate(id, req.body, { new: true });
    res.json(rtesVmx);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar Rtes Vmx" });
  }
};