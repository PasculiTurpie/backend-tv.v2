const express = require('express');
const Equipment = require('../controllers/equipo.controller');
const router = express.Router();

router.get("/equipment", Equipment.getEquipment);
router.get("/equipment/:id", Equipment.getEquipmentById);
router.post("/equipment",Equipment.postEquipment);
router.patch("/equipment/:id",Equipment.updateEquipment);
router.delete("/equipment/:id",Equipment.deleteEquipment);

module.exports = router;