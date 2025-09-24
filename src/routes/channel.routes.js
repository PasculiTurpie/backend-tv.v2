const express = require('express')
const router = express.Router()
const Channel = require('../controllers/channel.controller')
const { authRequired } = require("../middleware/authRequired.js");

// Crear
router.post("/channels", Channel.createChannel);

// Listar todos
router.get("/channels", Channel.getChannel);

// Obtener uno por ID
router.get("/channels/:id", Channel.getChannelId);

// Actualizar canal completo
router.put("/channels/:id",authRequired, Channel.updateChannel);

// Actualizar solo flujo (nodos/edges)
router.put("/channels/:id/flow",authRequired, Channel.updateChannelFlow);

// Eliminar
router.delete("/channels/:id",authRequired, Channel.deleteChannel);


module.exports = router;