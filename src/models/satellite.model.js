const mongoose = require('mongoose');

const SatelliteSchema = new mongoose.Schema({

    nombreSat: {
        type: String,
        required: true,
    },
    polarization: {
        type: String,
        required: true,
    },
    urlImagen: {
        type: String,
        required: true,
    },
});

const Satellite = mongoose.model('Satellite', SatelliteSchema);
module.exports = Satellite;