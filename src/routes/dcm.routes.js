const express = require('express')
const router = express.Router()
const Dcm = require('../controllers/dcm.controller')

router.get('/dcm', Dcm.getDcm)
router.get("/dcm/:id", Dcm.getIdDcm);
router.post('/dcm', Dcm.createDcm)
router.put("/dcm/:id", Dcm.updateDcm);
router.delete("/dcm/:id", Dcm.deleteDcm);

module.exports = router