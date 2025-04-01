const express = require('express');
const router = express.Router();
const Ird = require('../controllers/ird.controller');

router.get('/ird', Ird.getIrd)
router.get("/ird/:id", Ird.getIdIrd);
router.post("/ird", Ird.createIrd);
router.patch("/ird/:id", Ird.updateIrd);
router.delete("/ird/:id", Ird.deleteIrd);


module.exports = router;