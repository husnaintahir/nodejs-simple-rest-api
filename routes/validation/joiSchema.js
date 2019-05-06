// import Joi from 'joi';
const Joi = require('joi');

// export default {
module.exports = {
  checkBody: function (err, data) {
    console.log('body in joi schema', req.body);
    return req.body;
  },
  // POST /api/users
  validateAuth: {
    body: {
      //   email: Joi.string().required().label('email is required please enter your email'), //for custom error message
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  // POST /api/users
  validateSignup: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
      first_name: Joi.string().required()
    }
  },
};