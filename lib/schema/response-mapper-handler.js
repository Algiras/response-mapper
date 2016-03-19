'use strict';

var Joi = require('joi');

module.exports = Joi.object().keys({
  resource: Joi.alternatives(Joi.string().min(1), Joi.func()).required(),
  handler: Joi.func().required()
}).required();
