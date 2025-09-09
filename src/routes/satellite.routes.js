const express = require('express');
const router = express.Router();
const Satellite = require('../controllers/satellite.controller');
const { authProfile } = require('../middleware/validateToken');

router.get("/satelite", Satellite.getSatellites);
router.get('/satelite/:id', Satellite.getSatelliteById);
router.post('/satelite',authProfile, Satellite.postSatellite);
router.put("/satelite/:id", authProfile, Satellite.updateSatellite);
router.delete('/satelite/:id',authProfile,  Satellite.deleteSatellite);

module.exports = router;
