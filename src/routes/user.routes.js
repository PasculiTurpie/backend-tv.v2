const express = require('express')
const User = require('../controllers/user.controller');
const { authProfile } = require('../middleware/validateToken');
const router = express.Router();

router.get("/users", authProfile, User.getAllUser);
router.get("/user/:id", authProfile, User.getUserId);
router.post("/user", authProfile, User.createUser);
router.delete("/user/:id", authProfile, User.deleteUser);
router.put("/user/:id", authProfile, User.updateUser);


module.exports = router;