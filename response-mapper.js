'use strict';

var _ = require('lodash');
var extractors = require('./lib/extractors');
var stringExtractor = require('./lib/string-extractor');
var aggregationHandling = require('./lib/aggregation-handling');
var responseMapperSchema = require('./lib/schema/response-mapper');
var Joi = require('joi');

var buildResults = function (map) {

  var buildResultsWithoutName = function (tail) {
    var tempMap = {};
    var tempName = 'temp';
    tempMap[tempName] = tail;
    return function (response) {
      return buildResults(tempMap)(response)[tempName];
    };
  };

  var prepareMapForDeepening = function (unmutatedMap) {
    var head = unmutatedMap.slice(0, unmutatedMap.indexOf('('));
    var tail = unmutatedMap.slice(unmutatedMap.indexOf('(')).replace('..', '~');
    return head + tail;
  };

  return function (response) {
    return _.reduce(map, function (memo, obj, key) {
      if (_.isString(obj)) {
        var preparedMap = prepareMapForDeepening(obj);
        var value = preparedMap.split('..');
        var head = value[0];
        var tail = preparedMap.split('..').splice(1).join('..');

        var manageR = buildResultsWithoutName(tail);
        var preparedExtractors = extractors(buildResultsWithoutName, tail);
        var firstKeyCheck = stringExtractor({
          '*': preparedExtractors['*'],
          '!': preparedExtractors['!'],
          '@': preparedExtractors['@'],
          '+': preparedExtractors['+']
        }, {
          single: function (name, queryResponse) {
            return queryResponse[name];
          },
          multiple: function (name, queryResponse) {
            return manageR(queryResponse[name]);
          }
        });

        var firstSymbolExtractor = {
          extractKey: function (extractKey) {
            return extractKey[0];
          },
          stripExtractKey: function (extractKey) {
            return extractKey.slice(1);
          }
        };

        memo[key] = firstKeyCheck(head, firstSymbolExtractor)(value.length, this)(response);

      } else if (_.isFunction(obj)) {

        memo[key] = obj(response);
      } else if (_.isObject(obj)) {

        memo[key] = obj.handler(buildResultsWithoutName(obj.resource)(response));
      } else if (_.isNumber(obj)){
        memo[key] = obj;
      }
        else {
        Joi.assert(obj, responseMapperSchema);
      }
      return memo;
    }, {});
  };
};

module.exports = {
  buildResults: buildResults,
  methods: {
    aggregationHandling: aggregationHandling
  }
};
