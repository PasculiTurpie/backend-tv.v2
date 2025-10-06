const express = require("express");
const UserController = require("../controllers/user.controller");
const { authRequired } = require("../middleware/authRequired");

const router = express.Router();

router.get("/users", UserController.getAllUser);
router.get(["/users/me", "/user/me"], authRequired, UserController.getUserById);
router.get(["/users/:id", "/user/:id"], UserController.getUserId);
router.post(["/users", "/user"], authRequired, UserController.createUser);
router.delete(["/users/:id", "/user/:id"], authRequired, UserController.deleteUser);
router.put(["/users/:id", "/user/:id"], authRequired, UserController.updateUser);

module.exports = router;
