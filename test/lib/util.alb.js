/*eslint camelcase: 0*/
'use strict';

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var util = require('../../lib/util');

var suite = lab.suite;
var test = lab.test;
var expect = Code.expect;

suite('lib', function () {

  suite('util', function () {

    suite('splitBrackets', function () {

      test('should split out the name', function (done) {
        var testCase = 'a(a:b)';
        var testResult = 'a';
        expect(util.splitBrackets(testCase).name).to.be.equal(testResult);
        done();
      });
      test('should split out the bracket properties', function (done) {
        var testCase = 'a(a:b)';
        var testResult = 'a:b';
        expect(util.splitBrackets(testCase).properties).to.be.deep.equal([testResult]);
        expect(util.splitBrackets(testCase).properties[0]).to.be.equal(testResult);
        done();
      });

    });

    suite('reduceBracketProperties', function () {

      var sampleResponse = function (value) {
        return function (request) {
          return {
            value: value,
            request: request
          };
        };
      };

      var request = 'awesome';

      test('should map key value pairs to response map properties', function (done) {
        var testPropertiess = ['a.b', 'b:c'];
        var sampleReduceResult = util.reduceBracketProperties(testPropertiess, request, sampleResponse);
        var testCase = {
          b: {
            value: 'c',
            request: 'awesome'
          }
        };
        expect(sampleReduceResult).to.deep.equal(testCase);
        done();
      });

    });
  });
});
