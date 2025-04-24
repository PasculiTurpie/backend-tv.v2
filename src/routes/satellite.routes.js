const express = require('express');
const router = express.Router();
const Satellite = require('../controllers/satellite.controller');




router.get('/satellite', Satellite.getSatellites);
router.get('/satellite/:id', Satellite.getSatelliteById);
router.post("/satellite", Satellite.postSatellite);
router.patch('/satellite/:id', Satellite.updateSatellite);
router.delete('/satellite/:id', Satellite.deleteSatellite);

module.exports = router;