const express = require("express");
const router = express.Router();
const auth = require('../config/auth');
const Conmutador =require('../controllers/conmutador.controller')

router.get("/conmutador", Conmutador.getConmutador);
router.post("/conmutador", Conmutador.createConmutador);

module.exports = router;
