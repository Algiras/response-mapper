/*eslint camelcase: 0*/

'use strict';

var Joi = require('joi');

module.exports = Joi.object().pattern(/.*/,
  Joi.object().keys({
    buckets: Joi.array().items(Joi.object().keys({
      key: Joi.string().min(1).required(),
      doc_count: Joi.number().integer().min(0).required()
    })).required(),
    sum_other_doc_count: Joi.number().integer().min(0).optional(),
    doc_count_error_upper_bound: Joi.number().integer().min(0).optional()
  }));
