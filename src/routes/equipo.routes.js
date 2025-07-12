const express = require('express');
const Equipo = require('../controllers/equipo.controller')
const router = express.Router();

router.get('/equipo', Equipo.getEquipo)
router.get("/equipo/:id", Equipo.getIdEquipo);
router.post("/equipo", Equipo.createEquipo);
router.put("/equipo/:id", Equipo.updateEquipo);
router.delete("/equipo/:id", Equipo.deleteEquipo)

module.exports = router;