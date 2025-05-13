const express = require('express')
const router = express.Router()
const DcmVmx = require('../controllers/dcmVmx.controller')

router.get('/dcmVmx', DcmVmx.getDcmVmx)
router.post('/dcmVmx', DcmVmx.createDcmVmx)

module.exports = router