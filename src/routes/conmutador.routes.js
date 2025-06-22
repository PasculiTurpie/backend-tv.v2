const express = require("express");
const router = express.Router();
const auth = require('../config/auth');
const Conmutador =require('../controllers/conmutador.controller')

router.get("/switch", Conmutador.getConmutador);
router.get("/switch/:id", Conmutador.getIdConmutador);
router.post("/switch", Conmutador.createConmutador);
router.delete("/switch/:id", Conmutador.deleteConmutador);
router.put("/switch/:id", Conmutador.updateConmutador);
module.exports = router;
