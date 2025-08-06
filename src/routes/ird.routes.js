const express = require('express');
const router = express.Router();
const Ird = require('../controllers/ird.controller');
const { authProfile } = require('../middleware/validateToken');

router.get("/ird", authProfile, Ird.getIrd);
router.get("/ird/:id",authProfile, Ird.getIdIrd);
router.post("/ird",authProfile, Ird.createIrd);
router.put("/ird/:id", authProfile, Ird.updateIrd);
router.delete("/ird/:id",authProfile, Ird.deleteIrd);


module.exports = router;