const express = require('express');
const router = express.Router();
const TipoTech = require('../controllers/tipoTech.controller')


router.post('/tecnologia', TipoTech.createTech);
router.get('/tecnologia', TipoTech.getTech)

module.exports = router