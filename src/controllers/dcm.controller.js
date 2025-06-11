const Dcm = require('../models/dcm.model')

module.exports.createDcm = async (req, res) => {
    try {
        const dcm = new Dcm(req.body)
        await dcm.save()
        res.status(200).json(dcm)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:`Error al crear DCM`
        })
    }
}

module.exports.getDcm = async (req, res) =>{
    try {
        const dcm = await Dcm.find()
        res.json(dcm)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:`Error al obtener el equipo`})
    }
}

module.exports.updateDcm = async (req, res) => {
    try {
        const id = req.params.id;
        const dcm = await Dcm.findByIdAndUpdate(id, req.body, { new: true });
        res.json(dcm)
        
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar Dcm" });
    }
}