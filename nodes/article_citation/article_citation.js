var _ = require('underscore');


var Node = require('../node');

// Lens.ArticleCitation
// -----------------
//

var ArticleCitation = function(node) {
  Node.call(this, node);
};

// Type definition
// -----------------
//

ArticleCitation.type = {
  "id": "article_citation", // type name
  "parent": "content",
  "properties": {
    "title": "string",
    "label": "string",
    "authors": ["array", "string"],
    "doi": "string",
    "source": "string",
    "volume": "string",
    "fpage": "string",
    "lpage": "string",
    "citation_urls": ["array", "string"]
  }
};

// This is used for the auto-generated docs
// -----------------
//

ArticleCitation.description = {
  "name": "Article Citation",
  "remarks": [
    "A journal article citation.",
    "This element can be used to describe typical journal article citations."
  ],
  "properties": {
    "title": "The article's title",
    "label": "Optional label (could be a number for instance)",
    "doi": "DOI reference",
    "source": "Usually the journal name",
    "volume": "Issue number",
    "fpage": "First page",
    "lpage": "Last page",
    "citation_urls": "A list of links for accessing the article on the web"
  }
};


// Example ArticleCitation
// -----------------
//

ArticleCitation.example = {
  "id": "article_nature08160",
  "type": "article_citation",
  "label": "5",
  "title": "The genome of the blood fluke Schistosoma mansoni",
  "authors": [
    "M Berriman",
    "BJ Haas",
    "PT LoVerde"
  ],
  "doi": "http://dx.doi.org/10.1038/nature08160",
  "source": "Nature",
  "volume": "460",
  "fpage": "352",
  "lpage": "8",
  "citation_urls": [
    "http://www.ncbi.nlm.nih.gov/pubmed/19606141"
  ]
};


ArticleCitation.Prototype = function() {
  // Returns the citation URLs if available
  // Falls back to the DOI url
  // Always returns an array;
  this.urls = function() {
    return this.properties.citation_urls.length > 0 ? this.properties.citation_urls
                                                    : [this.properties.doi];
  };
};

ArticleCitation.Prototype.prototype = Node.prototype;
ArticleCitation.prototype = new ArticleCitation.Prototype();
ArticleCitation.prototype.constructor = ArticleCitation;


// Generate getters
// --------

var getters = {
  header: {
    get: function() {
      return this.properties.title;
    }
  },
};

_.each(ArticleCitation.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    }
  };
});

Object.defineProperties(ArticleCitation.prototype, getters);

module.exports = ArticleCitation;