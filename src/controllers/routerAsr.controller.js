const RouterAsr = require('../models/routerAsr.model')

module.exports.createRouterAsr = async (req, res) => {
    try {
        const routerAsr = new RouterAsr(req.body)
        await routerAsr.save()
        res.status(200).json(routerAsr)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:`Error al crear routerAsr`
        })
    }
}

module.exports.getRouterAsr = async (req, res) =>{
    try {
        const routerAsr = await RouterAsr.find()
        res.json(routerAsr)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:`Error al obtener el equipo`})
    }
}