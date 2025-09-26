const express = require('express');
const router = express.Router();
const TipoEquipo = require('../controllers/tipoEquipo.controller');


router.get("/tipo-equipo",TipoEquipo.getTipoEquipo);
router.post("/tipo-equipo",TipoEquipo.createTipoEquipo);

module.exports = router;