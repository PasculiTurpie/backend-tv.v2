const express = require('express')
const router = express.Router()
const Titan = require('../controllers/titan.controller')

router.get('/titan', Titan.getTitan)
router.get("/titan/:id", Titan.getIdTitan);
router.post('/titan', Titan.createtitan)
router.put("/titan/:id", Titan.updateTitan);
router.delete("/titan/:id", Titan.deleteTitan);

module.exports = router