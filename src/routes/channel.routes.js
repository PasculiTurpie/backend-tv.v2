const express = require('express')
const router = express.Router()
const Channel = require('../controllers/channel.controller')
const { authProfile } = require('../middleware/validateToken')

// Crear
router.post("/channels", authProfile, Channel.createChannel);

// Listar todos
router.get("/channels", Channel.getChannel);

// Obtener uno por ID
router.get("/channels/:id", Channel.getChannelId);

// Actualizar canal completo
router.put("/channels/:id", authProfile, Channel.updateChannel);

// Actualizar solo flujo (nodos/edges)
router.put("/channels/:id/flow", authProfile, Channel.updateChannelFlow);

// Eliminar
router.delete("/channels/:id", authProfile, Channel.deleteChannel);


module.exports = router;