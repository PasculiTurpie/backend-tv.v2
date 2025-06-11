const express = require('express')
const router = express.Router()
const Dcm = require('../controllers/dcm.controller')

router.get('/dcm', Dcm.getDcm)
router.post('/dcm', Dcm.createDcm)
router.put("/dcm/:id", Dcm.updateDcm);

module.exports = router