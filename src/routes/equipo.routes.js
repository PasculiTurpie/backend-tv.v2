const express = require("express");
const EquipoController = require("../controllers/equipo.controller");

const router = express.Router();

const EQUIPO_COLLECTION_ROUTES = ["/equipos", "/equipo"];
const EQUIPO_ENTITY_ROUTES = ["/equipos/:id", "/equipo/:id"];

EQUIPO_COLLECTION_ROUTES.forEach((path) => {
  router.get(path, EquipoController.getEquipo);
  router.post(path, EquipoController.createEquipo);
});

EQUIPO_ENTITY_ROUTES.forEach((path) => {
  router.get(path, EquipoController.getIdEquipo);
  router.put(path, EquipoController.updateEquipo);
  router.delete(path, EquipoController.deleteEquipo);
});

module.exports = router;
