const express = require('express')
const router = express.Router()
const Channel = require('../controllers/channel.controller')
const { authProfile } = require('../middleware/validateToken')

router.post('/channels', Channel.createChannel)
router.get('/channels', Channel.getChannel)
router.get('/channels/:id', Channel.getChannelId)
router.put('/channels/:id', Channel.updateChannel)


module.exports = router;