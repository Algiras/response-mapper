'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var responseMapperHandlerSchema = require('../../../lib/schema/response-mapper-handler');
var Joi = require('joi');

var suite = lab.suite;
var test = lab.test;

suite('lib', function () {
  suite('schema', function () {
    suite('response-mapper-handler', function () {
      test('should have correct schema', function (done) {
        Joi.assert(require('../../fixtures/lib/schema/response-mapper-handler'), responseMapperHandlerSchema);
        done();
      });
    });
  });
});
