'use strict';
var _ = require('lodash');
var util = require('./util');

var Extractors = function (manageResponse, tail) {
  var manageR = manageResponse(tail);
  return {
    '*': {
      multiple: function (name, queryResponse) {
        return _.reduce(queryResponse[name], function (responses, responseValue) {
          responses.push(manageR(responseValue));
          return responses;
        }, []);
      }
    },
    '!': {
      single: function (name, queryResponse) {
        var result;
        if (_.isArray(queryResponse[name]) && queryResponse[name].length > 0) {
          result = queryResponse[name][0];
        } else {
          result = queryResponse[name];
        }
        return result;
      },
      multiple: function (name, queryResponse) {
        var result;
        if (_.isArray(queryResponse[name]) && queryResponse[name].length > 0) {
          result = manageR(queryResponse[name][0]);
        } else {
          result = manageR(queryResponse[name]);
        }
        return result;
      }
    },
    '@': {
      single: function (name, queryResponse) {
        var bracketSplit = util.splitBrackets(name);
        return util.reduceBracketProperties(bracketSplit.properties, queryResponse[bracketSplit.name], manageResponse);
      }
    },
    '+': {
      single: function (name, queryResponse) {
        var bracketSplit = util.splitBrackets(name);
        var extractedObj = util.reduceBracketProperties(
          bracketSplit.properties,
          queryResponse,
          manageResponse);

        return _.extend(extractedObj, queryResponse[bracketSplit.name]);
      }
    }
  };
};

module.exports = Extractors;
