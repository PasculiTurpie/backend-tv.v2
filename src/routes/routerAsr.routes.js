const express = require('express')
const router = express.Router()
const RouterAsr = require('../controllers/routerAsr.controller');
const { authProfile } = require('../middleware/validateToken');

router.get("/routerAsr", authProfile, RouterAsr.getRouterAsr);
router.post('/routerAsr',authProfile, RouterAsr.createRouterAsr)

module.exports = router