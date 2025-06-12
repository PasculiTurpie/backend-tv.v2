const DcmVmx  = require('../models/dcmVmx.model');


module.exports.getDcmVmx = async (req, res) =>{
    try {
        const dcmVmx = await DcmVmx.find();
        res.json(dcmVmx)        
    } catch (error) {
        console.log(error)
        res.send(404).json({message:`Error al encontrar Dcm Vmx`})
    }
}

module.exports.createDcmVmx = async (req, res) => {
   const dcmVmx = new DcmVmx(req.body);
   try {
    await dcmVmx.save();
    res.status(200).json(dcmVmx)
    
   } catch (error) {
    console.error(error)
    res.status(500).json({ message:`Error al crear Dcm Vmx`})
   }
}

module.exports.getIdDcmVmx = async (req, res) =>{
try {
    const id = req.params.id;
    const dcmVmx = await DcmVmx.findById(id);
    res.json(dcmVmx)    
} catch (error) {
    res.status(500).json({message: "Error al obtener Dcm Vmx"})
}
}

module.exports.updateDcmVx = async (req, res) => {
  try {
    const id = req.params.id;
    const dcmVmx = await DcmVmx.findByIdAndUpdate(id, req.body, { new: true });
    res.json(dcmVmx);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar Dcm Vmx" });
  }
};

module.exports.deleteDcmVmx = async (req, res) => {
  try {
    const id = req.params.id;
    const dcmVmx = await DcmVmx.findByIdAndDelete(id);
    if (!dcmVmx) return res.status(404).json({ message: `Equipo no encontrado` });
    res.json({ message: "Dcm Vmx eliminado de la base de datos" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar Dcm" });
  }
};