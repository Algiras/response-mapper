'use strict';

var _ = require('lodash');

/**
 * Splits the name and property of map name
 * @param name
 * @returns {{name: string, properties: Array}}
 */
var splitBrackets = function (name) {
  return {
    name: name.slice(0, name.indexOf('(')),
    // .replace('~','..') is for deepening
    properties: name.slice(name.indexOf('(')).slice(1, -1).replace('~', '..').split(',')
  };
};

/**
 * Reduces properties inside the brackets by renaming them specified names and doing deeper response mapping
 * @param properties {Array.<string>}
 * @param request {*}
 * @param response {function}
 * @returns {*}
 */
var reduceBracketProperties = function (properties, request, response) {
  return _.reduce(properties, function (cMemo, property) {
    var propSplit = property.split(':');
    var cKey = propSplit[0];
    var cValue = propSplit[1];
    if (propSplit.length === 2 && !_.isUndefined(request)) {
      cMemo[cKey] = response(cValue)(request);
    }
    return cMemo;
  }, {});
};

module.exports = {
  splitBrackets: splitBrackets,
  reduceBracketProperties: reduceBracketProperties
};
