'use strict';

var Joi = require('joi');
var responseMapperHandler = require('./response-mapper-handler');

module.exports = Joi.alternatives(responseMapperHandler, Joi.string(), Joi.func(), Joi.number()).required();
