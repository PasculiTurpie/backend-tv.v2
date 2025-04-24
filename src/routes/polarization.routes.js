const express = require('express');
const router = express.Router();
const Polarization = require('../controllers/polarization.controller')


router.get("/polarization", Polarization.getPolarization);
router.post('/polarization', Polarization.createPolarization);


module.exports = router;