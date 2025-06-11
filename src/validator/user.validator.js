const { check } = require("express-validator");
const validateResult = require('../helpers/validateHelper')

const validateCreateUser = [
  check("username").exists().not().isEmpty(),
  check("email").exists().not().isEmail(),
  check("profilePicture").exists().not().isEmpty(),
  check("password").exists().not().isEmpty(),
  check("role").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];

module.exports = validateCreateUser;