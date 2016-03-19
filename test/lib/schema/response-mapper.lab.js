'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var responseMapperSchema = require('../../../lib/schema/response-mapper');
var Joi = require('joi');

var suite = lab.suite;
var test = lab.test;

suite('lib', function () {
  suite('schema', function () {
    suite('response-mapper', function () {
      test('should have correct schema', function (done) {
        var responseMapperHandler = require('../../fixtures/lib/schema/response-mapper-handler');
        Joi.assert(responseMapperHandler, responseMapperSchema);
        Joi.assert('testString', responseMapperSchema);
        Joi.assert(function(){}, responseMapperSchema);
        done();
      });
    });
  });
});
