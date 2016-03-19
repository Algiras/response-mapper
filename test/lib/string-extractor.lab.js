'use strict';

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var stringExtractor = require('../../lib/string-extractor');

var suite = lab.suite;
var test = lab.test;
var expect = Code.expect;

suite('stringExtractor', function () {
  test('should extract first argument of parsed param and return paramCheck function', function (done) {
    var map = {
      '!': {
        single: function () {
          return 1;
        },
        multiple: function () {
          return [1];
        }
      }
    };
    var func = stringExtractor(map);

    expect('function').to.equal(typeof func);
    done();
  });

  test('should create a function, that return\'s a function that handles either single or multiple to of response', function (done) {
    var map = {
      '!': {
        single: function (name, nr) {
          return name + nr;
        },
        multiple: function (name, numbers) {
          return numbers.map(function (value) {
            return name + (value * 2);
          });
        }
      },
      '?': {}
    };

    var extractor = {
      extractKey: function (key) {
        return key[0];
      },
      stripExtractKey: function (key) {
        return key.slice(1);
      }
    };

    var func = stringExtractor(map)('!awesome', extractor);
    var func2 = stringExtractor(map)('?awesome', extractor);
    var func3 = stringExtractor(map)('?awesome');
    var single = func(1)(1);
    var multi = func(2)([2, 3]);
    var singleQ = func2(1)(1);
    var noActionNoExtractor = func3()(1);

    expect(undefined).to.equal(noActionNoExtractor);
    expect('awesome1').to.equal(single);
    expect(undefined).to.equal(singleQ);
    expect(['awesome4', 'awesome6']).to.deep.equal(multi);

    done();
  });
});
