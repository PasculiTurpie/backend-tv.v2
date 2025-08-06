const express = require('express')
const router = express.Router()
const Channel = require('../controllers/channel.controller')
const { authProfile } = require('../middleware/validateToken')

router.get('/channel',authProfile, Channel.getChannel)
router.get("/channel/:id", authProfile, Channel.getChannelId);
router.post("/channel", authProfile, Channel.createChannel);
router.put("/channel/:id", authProfile, Channel.updateChannel);
router.delete("/channel/:id", authProfile, Channel.deleteChannel);
router.patch("/:id/flow", authProfile, Channel.updateChannelFlow);


module.exports = router;