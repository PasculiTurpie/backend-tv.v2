const express = require('express')
const router = express.Router()
const RtesVmx = require('../controllers/rtesVmx.controller')

router.get('/rtesVmx', RtesVmx.getRtesVmx)
router.post('/rtesVmx', RtesVmx.createRtesVmx)

module.exports = router