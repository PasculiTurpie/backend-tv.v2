const express = require('express')
const router = express.Router()
const RtesVmx = require('../controllers/rtesVmx.controller')

router.get('/rtesVmx', RtesVmx.getRtesVmx)
router.get('/rtesVmx/:id', RtesVmx.getIdRtesVmx)
router.post('/rtesVmx', RtesVmx.createRtesVmx)
router.delete('/rtesVmx/:id', RtesVmx.deleteRtesVmx)
router.put('/rtesVmx/:id', RtesVmx.updateTitan)

module.exports = router