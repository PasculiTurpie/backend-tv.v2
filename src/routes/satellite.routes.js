const express = require("express");
const SatelliteController = require("../controllers/satellite.controller");

const router = express.Router();

const SATELLITE_COLLECTION_ROUTES = ["/satellites", "/satelite"];
const SATELLITE_ENTITY_ROUTES = ["/satellites/:id", "/satelite/:id"];

SATELLITE_COLLECTION_ROUTES.forEach((path) => {
  router.get(path, SatelliteController.getSatellites);
  router.post(path, SatelliteController.postSatellite);
});

SATELLITE_ENTITY_ROUTES.forEach((path) => {
  router.get(path, SatelliteController.getSatelliteById);
  router.put(path, SatelliteController.updateSatellite);
  router.delete(path, SatelliteController.deleteSatellite);
});

module.exports = router;
