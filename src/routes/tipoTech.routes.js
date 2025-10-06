const express = require("express");
const TipoTechController = require("../controllers/tipoTech.controller");

const router = express.Router();

const TECH_COLLECTION_ROUTES = ["/tecnologias", "/tecnologia"];

TECH_COLLECTION_ROUTES.forEach((path) => {
  router.get(path, TipoTechController.getTech);
  router.post(path, TipoTechController.createTech);
});

module.exports = router;
