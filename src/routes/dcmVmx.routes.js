const express = require('express')
const router = express.Router()
const DcmVmx = require('../controllers/dcmVmx.controller');
const { authProfile } = require('../middleware/validateToken');

router.get("/dcmVmx", authProfile, DcmVmx.getDcmVmx);
router.post('/dcmVmx',authProfile, DcmVmx.createDcmVmx)
router.get('/dcmVmx/:id',authProfile, DcmVmx.getIdDcmVmx)
router.put('/dcmVmx/:id',authProfile, DcmVmx.updateDcmVx)
router.delete('/dcmVmx/:id',authProfile, DcmVmx.deleteDcmVmx)


module.exports = router