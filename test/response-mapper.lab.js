/*eslint sort-vars:0*/
'use strict';

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var responseMapper = require('../../response-mapper').buildResults;

var suite = lab.suite;
var test = lab.test;
var expect = Code.expect;

suite('Response Mapper', function () {
  test('Build results using a map', function (done) {

    var map = {
      a: 'b..c',
      d: 'd',
      f: 'b..*e..f',
      g: 'b..*g',
      h: 'b..h',
      l: 'b..@l(a:!b..m)',
      e: {
        resource: 'b..c', handler: function (nr) {
          return nr * 2;
        }
      },
      k: function (fullQuery) {
        return fullQuery.b.c;
      },
      m: 'b..+l(g:g,h:h)',
      n: 3
    };
    var query = {
      b: {
        c: 1,
        e: [
          {f: 1},
          {f: 2}
        ],
        h: 1,
        g: [1, 2, 3],
        l: {
          a: 1,
          b: [{m: 3}, {m: 4}]
        }
      },
      d: 2
    };

    var testCase = {
      a: 1,
      d: 2,
      f: [1, 2],
      g: [1, 2, 3],
      h: 1,
      l: {a: 3},
      e: 2,
      k: 1,
      m: {a: 1, b: [{m: 3}, {m: 4}], h: 1, g: [1, 2, 3]},
      n : 3
    };

    var result = responseMapper(map)(query);

    expect(testCase).to.deep.equal(result);

    done();
  });

  test('Fail report if type is unknown', function (done) {

    var map = {
      a: 2
    };
    var query = {
      b: 2
    };

    try {
      responseMapper(map)(query);
    } catch (e) {
      var testErrorMessage = e.message;
      expect(testErrorMessage.indexOf('object')).to.be.above(-1);
      expect(testErrorMessage.indexOf('string')).to.be.above(-1);
      expect(testErrorMessage.indexOf('Function')).to.be.above(-1);
    }
    done();
  });

  test('Fail report if type is undefined', function (done) {

    var map = {
      a: undefined
    };
    var query = {
      b: 2
    };

    try {
      responseMapper(map)(query);
    } catch (e) {
      var testErrorMessage = e.message;
      expect(testErrorMessage.indexOf('value')).to.be.above(-1);
    }
    done();
  });
});
