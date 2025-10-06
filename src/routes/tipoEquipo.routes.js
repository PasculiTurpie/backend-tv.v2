const express = require("express");
const TipoEquipoController = require("../controllers/tipoEquipo.controller");

const router = express.Router();

const TIPO_EQUIPO_ROUTES = ["/tipo-equipo", "/tipos-equipo"];

TIPO_EQUIPO_ROUTES.forEach((path) => {
  router.get(path, TipoEquipoController.getTipoEquipo);
  router.post(path, TipoEquipoController.createTipoEquipo);
});

module.exports = router;
