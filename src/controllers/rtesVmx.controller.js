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