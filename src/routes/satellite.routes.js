const express = require('express');
const { celebrate } = require("celebrate");
const router = express.Router();
const Satellite = require('../controllers/satellite.controller');
const {
  createSatelliteValidation,
  updateSatelliteValidation,
} = require("../middleware/Validations");



router.get('/satellite', Satellite.getSatellites);
router.get('/satellite/:id', Satellite.getSatelliteById);
router.post(
  "/satellite",
  celebrate(createSatelliteValidation),
  Satellite.postSatellite
);
router.patch('/satellite/:id', Satellite.updateSatellite);
router.delete('/satellite/:id', Satellite.deleteSatellite);

module.exports = router;