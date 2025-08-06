const express = require('express')
const User = require('../controllers/user.controller');
const auth = require('../config/auth');
const { authProfile } = require('../middleware/validateToken');
const router = express.Router();

router.get("/user", authProfile, User.getAllUser);
router.get("/user/:id", authProfile, User.getUserId);
router.post("/user", authProfile, User.createUser);
router.delete("/user/:id", authProfile, User.deleteUser);
router.put("/user/:id", authProfile, User.updateUser);

module.exports = router;