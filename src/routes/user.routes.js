const express = require('express')
const User = require('../controllers/user.controller');
const auth = require('../config/auth');
const router = express.Router();

router.get('/user',auth, User.getAllUser);
router.get("/user/:id", auth, User.getUserId);
router.post("/user", auth, User.createUser);
router.delete("/user/:id", auth, User.deleteUser);
router.put('/user/:id')

module.exports = router;