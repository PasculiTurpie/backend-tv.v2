const express = require('express');
const router = express.Router();
const TipoTech = require('../controllers/tipoTech.controller');
const { authProfile } = require('../middleware/validateToken');


router.post("/tecnologia", authProfile, TipoTech.createTech);
router.get('/tecnologia', TipoTech.getTech)

module.exports = router