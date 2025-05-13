const express = require('express')
const router = express.Router()
const RouterAsr = require('../controllers/routerAsr.controller')

router.get('/routerAsr', RouterAsr.getRouterAsr)
router.post('/routerAsr', RouterAsr.createRouterAsr)

module.exports = router