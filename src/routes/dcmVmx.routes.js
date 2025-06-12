const express = require('express')
const router = express.Router()
const DcmVmx = require('../controllers/dcmVmx.controller')

router.get('/dcmVmx', DcmVmx.getDcmVmx)
router.post('/dcmVmx', DcmVmx.createDcmVmx)
router.get('/dcmVmx/:id', DcmVmx.getIdDcmVmx)
router.put('/dcmVmx/:id', DcmVmx.updateDcmVx)
router.delete('/dcmVmx/:id', DcmVmx.deleteDcmVmx)


module.exports = router