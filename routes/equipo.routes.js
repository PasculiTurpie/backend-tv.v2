const express = require('express');
const Equipment = require('../controllers/equipo.controller');
const router = express.Router();

router.get("/equipment", Equipment.getEquipment);

router.post("/equipment",Equipment.postEquipment);
router.patch("/equipment/:id");
router.delete("/equipment/:id");

module.exports = router;