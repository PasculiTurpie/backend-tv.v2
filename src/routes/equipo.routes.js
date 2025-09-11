const express = require('express');
const Equipo = require('../controllers/equipo.controller');
const { authProfile } = require('../middleware/validateToken');

const router = express.Router();

router.get("/equipo", Equipo.getEquipo);
router.get("/equipo/:id", Equipo.getIdEquipo);
router.post("/equipo", authProfile, Equipo.createEquipo);
router.put("/equipo/:id",authProfile, Equipo.updateEquipo);
router.delete("/equipo/:id", authProfile, Equipo.deleteEquipo);

module.exports = router;