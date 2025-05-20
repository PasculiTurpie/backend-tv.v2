const express = require('express');
const router = express.Router();
const Polarization = require('../controllers/polarization.controller');
const auth = require('../config/auth');


router.get("/polarization", Polarization.getPolarization);
router.post('/polarization',  Polarization.createPolarization);


module.exports = router;