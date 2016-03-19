Response-mapper
=============
##To start work
```sh
npm install # to get all the dependencies
npm install --global gulp # if you don't have gulp globally installed
gulp # to start automatic watching/linting/testing
```
##Usage

 * (`..` at the beginning) - it's a object property and it will be extracted
 * (`*` at the beginning) - means it's a collection and it will be iterated
 * (`!` at the beginning) - gets the first element of array
 * (`@` at the beginning) - provides () wrapper object that you can use to extract values using (key:value) - key can be
 * any name you specify, value can be a nested object with any of the extractor tags. Values should be comma separated.

##Example Usage
```javascript
exports.map = {
  'took': 'took', // take as is
  'timeout': 'time_out', // take as is
  'count': 'hits..total', // take object hits and extract value of total
  'maxScore': 'hits..max_score', // take object hits and extract value of max_score
  'records': 'hits..*hits..@fields(' + // take value hits extract value of hits as array, then extract object fields from each of them and extract child values accordingly 
    'id:!id,' + // extract just first element of array that would be returned (Elasticsearch field issue)
    'links.listing.id:!links.listing.id,' +
    'title:!title,' +
    'date.created:!date.created,' +
    'date.modified:!date.modified,' +
    'wp.permalink:!wp.permalink,' +
    'content.excerpt:!content.excerpt,' +
    'content.featuredImage:!content.featuredImage,' +
    'wp.blogUrl:!wp.blogUrl,' +
    'tags:tags' + // take as is
  ')',
  'funky' : function(response){ return response.took; } // to manipulate the construct yourself,
  'funkyDrill' : {
    'resource' : 'took',
    'handler'  : function(thisIsValueOfTook){ return thisIsValueOfTook * 2; }
  },
  'justNr' : 3
};
``` 

##FAQ
* Why is this a separate library?

To make the code coverage easy we need to reuse tested code as much as possible.

* Can I add different extractors?

Yes
