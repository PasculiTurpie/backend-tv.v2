const express = require('express')
const router = express.Router()
const Signal = require('../controllers/signal.controller');
const { authProfile } = require('../middleware/validateToken');

router.get("/signal",  Signal.getSignal);
router.get("/signal/:id", Signal.getIdSignal);
router.post('/signal',authProfile, Signal.createSignal);
router.put("/signal/:id",authProfile, Signal.updateSignal);
router.delete("/signal/:id",authProfile, Signal.deleteSignal);
router.get('/search', Signal.searchSignals)


module.exports = router