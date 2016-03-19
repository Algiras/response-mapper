'use strict';

var stringExtractorDefaultAction = {
  single: function () {},
  multiple: function () {}
};

var stringExtractorDefaultExtractor = {
  extractKey: function (key) {
    return key;
  }
};


var stringExtractor = function (map, defaultAction) {

  defaultAction = defaultAction || stringExtractorDefaultAction;

  return function paramCheck(keyForMap, extractor) {
    var propName = '';

    extractor = extractor || stringExtractorDefaultExtractor;

    var funcKey = extractor.extractKey(keyForMap);

    if (map[funcKey] === undefined) {
      propName = keyForMap;
      var action = defaultAction;
    } else {
      propName = extractor.stripExtractKey(keyForMap);
      action = map[funcKey];

      if (action.single === undefined) {
        action.single = defaultAction.single;
      }

      if (action.multiple === undefined) {
        action.multiple = defaultAction.multiple;
      }

    }

    return function FuncNumSplit(nrOfSplits) {
      var response = function () {
      };
      if (nrOfSplits > 1) {
        response = action.multiple.bind(this, propName);
      } else {
        response = action.single.bind(this, propName);
      }

      return response;
    };
  };
};

module.exports = stringExtractor;
