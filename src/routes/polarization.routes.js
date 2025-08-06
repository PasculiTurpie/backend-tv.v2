const express = require('express');
const router = express.Router();
const Polarization = require('../controllers/polarization.controller');
const auth = require('../config/auth');
const { authProfile } = require('../middleware/validateToken');


router.get("/polarization", authProfile, Polarization.getPolarization);
router.post('/polarization',authProfile,  Polarization.createPolarization);


module.exports = router;