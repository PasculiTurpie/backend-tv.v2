const express = require('express')
const router = express.Router()
const Signal = require('../controllers/signal.controller')

router.get('/signal', Signal.getSignal)
router.get("/signal/:id", Signal.getIdSignal);
router.post('/signal', Signal.createSignal)

module.exports = router