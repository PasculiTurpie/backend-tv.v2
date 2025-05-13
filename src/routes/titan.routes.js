const express = require('express')
const router = express.Router()
const Titan = require('../controllers/titan.controller')

router.get('/titan', Titan.getTitan)
router.post('/titan', Titan.createtitan)

module.exports = router