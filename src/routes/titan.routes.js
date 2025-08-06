const express = require('express')
const router = express.Router()
const Titan = require('../controllers/titan.controller');
const { authProfile } = require('../middleware/validateToken');

router.get('/titan',authProfile, Titan.getTitan)
router.get("/titan/:id",authProfile, Titan.getIdTitan);
router.post('/titan',authProfile, Titan.createtitan)
router.put("/titan/:id",authProfile, Titan.updateTitan);
router.delete("/titan/:id", authProfile, Titan.deleteTitan);

module.exports = router