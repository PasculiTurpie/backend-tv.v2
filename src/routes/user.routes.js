const express = require("express");
const User = require("../controllers/user.controller");
const { authRequired } = require("../middleware/authRequired");

const router = express.Router();

router.get("/users", User.getAllUser);
router.get("/users/me", authRequired, User.getUserById);
router.get("/user/:id", User.getUserId);
router.post("/user", authRequired, User.createUser);
router.delete("/user/:id", authRequired, User.deleteUser);
router.put("/user/:id", authRequired, User.updateUser);

module.exports = router;
