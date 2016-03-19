'use strict';
/**
 * Response oriented functions
 * @module Response_Oriented
 */

var _ = require('lodash');
var aggregationSchema = require('./schema/aggregation');
var Joi = require('joi');
/**
 *
 * @param aggregations
 * @returns {object.<string,Array.<{key : string, count : number}>>}
 */
var aggregationResponseReduce = function (aggregations) {
  Joi.assert(aggregations, aggregationSchema);
  return _.reduce(aggregations, function (memo, aggregation, key) {
    var cAggregation = aggregation.buckets.reduce(function (inMemo, bucket) {
      inMemo.push({key: bucket.key, count: bucket.doc_count});
      return inMemo;
    }, []);

    if (aggregation.sum_other_doc_count > 0) {
      cAggregation.push({key: 'other', count: aggregation.sum_other_doc_count});
    }

    memo[key] = _.sortBy(cAggregation, 'key');

    return memo;
  }, {});
};

module.exports = {
  aggregationResponseReduce: aggregationResponseReduce
};
