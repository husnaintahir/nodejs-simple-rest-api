const express = require('express');
const router = express.Router();
const UserController = require('../app/api/controllers/users');

const validate = require('express-validation');
const joiSchema = require('./validation/joiSchema');


router.post('/register', validate(joiSchema.validateSignup), UserController.create);
router.post('/authenticate', validate(joiSchema.validateAuth), UserController.authenticate);

module.exports = router;