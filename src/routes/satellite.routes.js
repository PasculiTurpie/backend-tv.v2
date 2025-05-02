const express = require('express');
const router = express.Router();
const Satellite = require('../controllers/satellite.controller');
const auth = require('../config/auth');




router.get('/satellite', auth, Satellite.getSatellites);
router.get("/satellite/:id", auth, Satellite.getSatelliteById);
router.post("/satellite",auth,  Satellite.postSatellite);
router.put('/satellite/:id', auth, Satellite.updateSatellite);
router.delete('/satellite/:id',auth,  Satellite.deleteSatellite);

module.exports = router;