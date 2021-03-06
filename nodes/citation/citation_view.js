"use strict";

var _ = require('underscore');
var util = require('substance-util');
var html = util.html;
var NodeView = require("../node").View;
var TextView = require("../text").View;

var $$ = require("substance-application").$$;

var Renderer = function(view) {
    var frag = document.createDocumentFragment(),
        node = view.node;

    // Add title
    // -------

    // HACK: TextView needs a refactor so that it can be used as
    // a property view instead of a node view.
    var titleView = new TextView(node, {
      path: [node.id, 'title'],
      classes: 'title'
    });
    frag.appendChild(titleView.render().el);

    // Add Authors
    // -------

    frag.appendChild($$('.authors', {
      html: node.authors.join(', ')
    }));


    // Add Source
    // -------

    var source = [];

    // Hack for handling unstructured citation types and render prettier
    if (node.source && node.volume === ''){
      source.push(node.source);
    }

    if (node.source && node.volume) {
      source.push([node.source, node.volume].join(', ')+": ");
    }

    if (node.fpage && node.lpage) {
      source.push([node.fpage, node.lpage].join('-')+", ");
    }

    if (node.publisher_name && node.publisher_location) {
      source.push([node.publisher_name, node.publisher_location].join(', ')+", ");
    }

    if (node.year) {
      source.push(node.year);
    }

    frag.appendChild($$('.source', {
      html: source.join('')
    }));

    if (node.comment) {
      var commentView = new TextView(node, { path: [node.id, 'comment'], classes: 'comment' });
      frag.appendChild(commentView.render().el);
    }

    // Add DOI (if available)
    // -------

    if (node.doi) {
      frag.appendChild($$('.doi', {
        children: [
          $$('b', {text: "DOI: "}),
          $$('a', {
            href: node.doi,
            target: "_new",
            text: node.doi
          })
        ]
      }));
    }

    // TODO: Add display citations urls
    // -------

    var citationUrlsEl = $$('.citation-urls');

    _.each(node.citation_urls, function(url) {
      citationUrlsEl.appendChild($$('a.url', {
        href: url.url,
        text: url.name,
        target: "_blank"
      }))
    });

    frag.appendChild(citationUrlsEl)

    return frag;
};


// Lens.Citation.View
// ==========================================================================


var CitationView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass('citation');
};


CitationView.Prototype = function() {

  this.render = function() {
    NodeView.prototype.render.call(this);
    this.content.appendChild(new Renderer(this));
    return this;
  };

};

CitationView.Prototype.prototype = NodeView.prototype;
CitationView.prototype = new CitationView.Prototype();
CitationView.prototype.constructor = CitationView;

module.exports = CitationView;
