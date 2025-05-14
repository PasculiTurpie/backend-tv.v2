const express = require('express');
const router = express.Router();
const Satellite = require('../controllers/satellite.controller');
const auth = require('../config/auth');

router.get('/satelite', Satellite.getSatellites);
router.get('/satelite/:id', auth, Satellite.getSatelliteById);
router.post('/satelite', Satellite.postSatellite);
router.put('/satelite/:id', auth, Satellite.updateSatellite);
router.delete('/satelite/:id', auth, Satellite.deleteSatellite);

module.exports = router;
