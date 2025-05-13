const DcmVmx  = require('../models/dcmVmx.model');


module.exports.getDcmVmx = async (req, res) =>{
    try {
        const dcmVmx = await DcmVmx.find();
        res.json(
            { message:dcmVmx }
        )        
    } catch (error) {
        console.log(error)
        res.send(404).json({message:`Error al encontrar dcmVmx`})
    }
}

module.exports.createDcmVmx = async (req, res) => {
   const dcmVmx = new DcmVmx(req.body);
   try {
    await dcmVmx.save();
    res.status(200).json(dcmVmx)
    
   } catch (error) {
    console.error(error)
    res.status(500).json({ message:`Error al crear dcmVmx`})
   }
}