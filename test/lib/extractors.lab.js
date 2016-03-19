'use strict';

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var extractorsGen = require('../../lib/extractors');

var suite = lab.suite;
var test = lab.test;
var expect = Code.expect;

suite('Extractors', function () {

  var extractors = extractorsGen(function (first) {
    return function (second) {
      return {
        first: first,
        second: second
      };
    };
  }, 'tail');

  suite('!', function () {
    test('should return value', function (done) {
      var singleValue = extractors['!'].single('name', {name: 1});
      expect(1).to.be.equal(singleValue);
      done();
    });

    test('should return first element of Array', function (done) {
      var singleFirstArray = extractors['!'].single('name', {name: [1, 2, 3]});
      expect(1).to.be.equal(singleFirstArray);
      done();
    });

    test('should return value wrapped in wrapper element', function (done) {
      var multiValue = extractors['!'].multiple('name', {name: 1});
      expect({first: 'tail', second: 1}).to.be.deep.equal(multiValue);
      done();
    });

    test('should return first element of Array or the value', function (done) {
      var multiValueFirstArray = extractors['!'].multiple('name', {name: [1, 2, 3]});
      expect({first: 'tail', second: 1}).to.be.deep.equal(multiValueFirstArray);
      done();
    });
  });

  suite('@', function () {
    test('should return split object in wrapper', function (done) {
      var singleWrappedValue = extractors['@'].single('a(a:b)', {a: {b: 2}});
      expect({a: {first: 'b', second: {b: 2}}}).to.be.deep.equal(singleWrappedValue);
      done();
    });

    test('should return empty object when using bad : in a bad way', function (done) {
      var singleWrappedValue = extractors['@'].single('a(a:b:)', {a: {b: 2}});
      expect({}).to.be.deep.equal(singleWrappedValue);
      done();
    });

  });

});
