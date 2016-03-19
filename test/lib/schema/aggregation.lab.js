'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var aggregationSchema = require('../../../lib/schema/aggregation');
var Joi = require('joi');

var suite = lab.suite;
var test = lab.test;

suite('lib', function () {
  suite('schema', function () {
    suite('aggregation', function () {
      test('should have correct schema', function (done) {
        Joi.assert(require('../../fixtures/lib/schema/aggregation.json'), aggregationSchema);
        done();
      });
    });
  });
});
