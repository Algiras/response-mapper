/*eslint camelcase: 0*/
'use strict';

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var aggregationHandling = require('../../lib/aggregation-handling');

var suite = lab.suite;
var test = lab.test;
var expect = Code.expect;
var beforeEach = lab.beforeEach;

suite('Aggregation Handling', function () {
  suite('aggregationResponseReduce', function () {
    var aggregations;
    beforeEach(function(done){
      aggregations = JSON.parse(JSON.stringify(require('../fixtures/lib/schema/aggregation.json')));
      done();
    });

    test('should contain other', function (done) {
      aggregations.magic.sum_other_doc_count = 1;
      var expectedResult = {
        magic: [
          {key: 'alfa', count: 1},
          {key: 'beta', count: 2},
          {key: 'other', count: 1}
        ]
      };
      var testCase = aggregationHandling.aggregationResponseReduce(aggregations);
      expect(expectedResult).to.be.deep.equal(testCase);
      done();
    });

    test('should not contain other', function (done) {
      aggregations.magic.sum_other_doc_count = 0;
      var expectedResult = {
        magic: [
          {key: 'alfa', count: 1},
          {key: 'beta', count: 2}
        ]
      };
      var testCase = aggregationHandling.aggregationResponseReduce(aggregations);
      expect(expectedResult).to.be.deep.equal(testCase);
      done();
    });

  });
});
