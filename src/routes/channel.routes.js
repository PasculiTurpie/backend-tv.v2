const express = require('express')
const router = express.Router()
const Channel = require('../controllers/channel.controller')

router.get('/channel', Channel.getChannel)
router.get('/channel/:id', Channel.getChannelId )
router.post('/channel', Channel.createChannel)
router.put('/channel/:id', Channel.updateChannel)
router.delete('/channel/:id', Channel.deleteChannel)


module.exports = router;