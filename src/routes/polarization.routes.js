const express = require("express");
const PolarizationController = require("../controllers/polarization.controller");

const router = express.Router();

const POLARIZATION_COLLECTION_ROUTES = ["/polarizations", "/polarization"];

POLARIZATION_COLLECTION_ROUTES.forEach((path) => {
  router.get(path, PolarizationController.getPolarization);
  router.post(path, PolarizationController.createPolarization);
});

module.exports = router;
