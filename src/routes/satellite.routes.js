const express = require('express');
const router = express.Router();
const Satellite = require('../controllers/satellite.controller');


router.get("/satelite", Satellite.getSatellites);
router.get('/satelite/:id', Satellite.getSatelliteById);
router.post('/satelite', Satellite.postSatellite);
router.put("/satelite/:id",  Satellite.updateSatellite);
router.delete('/satelite/:id',  Satellite.deleteSatellite);

module.exports = router;
