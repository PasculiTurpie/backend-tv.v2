const express = require('express')
const router = express.Router()
const Dcm = require('../controllers/dcm.controller');
const { authProfile } = require('../middleware/validateToken');

router.get("/dcm", authProfile, Dcm.getDcm);
router.get("/dcm/:id",authProfile, Dcm.getIdDcm);
router.post('/dcm',authProfile, Dcm.createDcm)
router.put("/dcm/:id",authProfile, Dcm.updateDcm);
router.delete("/dcm/:id",authProfile, Dcm.deleteDcm);

module.exports = router