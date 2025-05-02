const express = require('express');
const router = express.Router();
const Polarization = require('../controllers/polarization.controller');
const auth = require('../config/auth');


router.get("/polarization", auth, Polarization.getPolarization);
router.post('/polarization', auth, Polarization.createPolarization);


module.exports = router;