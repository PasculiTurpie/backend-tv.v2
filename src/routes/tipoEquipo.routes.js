const express = require('express');
const router = express.Router();
const TipoEquipo = require('../controllers/tipoEquipo.controller');
const { authProfile } = require('../middleware/validateToken');

router.get("/tipo-equipo",authProfile, TipoEquipo.getTipoEquipo);
router.post("/tipo-equipo",authProfile,TipoEquipo.createTipoEquipo);

module.exports = router;