const express = require("express");
const router = express.Router();
const Conmutador =require('../controllers/conmutador.controller');
const { authProfile } = require("../middleware/validateToken");

router.get("/switch", authProfile, Conmutador.getConmutador);
router.get("/switch/:id",authProfile, Conmutador.getIdConmutador);
router.post("/switch",authProfile, Conmutador.createConmutador);
router.delete("/switch/:id",authProfile, Conmutador.deleteConmutador);
router.put("/switch/:id",authProfile, Conmutador.updateConmutador);
module.exports = router;
