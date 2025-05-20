const express = require('express')
const User = require('../controllers/user.controller');
const auth = require('../config/auth');
const router = express.Router();

router.get('/user', User.getAllUser);
router.get("/user/:id",  User.getUserId);
router.post("/user", User.createUser);
router.delete("/user/:id", User.deleteUser);
router.put("/user/:id", User.updateUser);

module.exports = router;