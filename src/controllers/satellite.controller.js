const Satellite = require('../models/satellite.model');

module.exports.getSatellites = async (req, res) => {
    try {
        const satellites = await Satellite.find().sort({ nombreSatelite: 1 });
        res.json(satellites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener satélites' });
    }
};

module.exports.getSatelliteById = async (req, res) => {
    try {
        const satellite = await Satellite.findById(req.params.id);
        if (!satellite) return res.status(404).json({ message: 'Satélite no encontrado' });
        res.json(satellite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener satélite' });
    }
};

module.exports.postSatellite = async (req, res) => {
    try {
        const satellite = new Satellite(req.body);
        await satellite.save();
        res.json(satellite);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al crear satélite' });
    }
};

module.exports.updateSatellite = async (req, res) => {
    try {
        const satellite = await Satellite.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!satellite) return res.status(404).json({ message: 'Satélite no encontrado' });
        res.json(satellite);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al actualizar satélite' });
    }
};

module.exports.deleteSatellite = async (req, res) => {
    try {
        const satellite = await Satellite.findByIdAndDelete(req.params.id);
        if (!satellite) return res.status(404).json({ message: 'Satélite no encontrado' });
        res.json({ message: 'Satélite eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar satélite' });
    }
};
