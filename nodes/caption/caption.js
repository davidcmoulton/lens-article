"use strict";

var Document = require("substance-document");

var Caption = function(node, document) {
  Document.Composite.call(this, node, document);
};

Caption.type = {
  "id": "caption",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "title": "paragraph",
    "children": ["array", "paragraph"]
  }
};

// This is used for the auto-generated docs
// -----------------
//

Caption.description = {
  "name": "Caption",
  "remarks": [
    "Container element for the textual description that is associated with a Figure, Table, Video node etc.",
    "This is the title for the figure or the description of the figure that prints or displays with the figure."
  ],
  "properties": {
    "title": "Caption title (optional)",
    "children": "0..n Paragraph nodes",
  }
};


// Example File
// -----------------
//

Caption.example = {
  "id": "caption_1",
  "children": [
    "paragraph_1",
    "paragraph_2"
  ]
};

Caption.Prototype = function() {

  this.hasTitle = function() {
    return (!!this.properties.title);
  };

  // The nodes the composite should spit out
  this.getNodes = function() {
    var nodes = [];

    if (this.properties.children) {
      nodes = nodes.concat(this.properties.children);
    }
    return nodes;
  };

  this.getTitle = function() {
    if (this.properties.title) return this.document.get(this.properties.title);
  };

  // this.getCaption = function() {
  //   if (this.properties.caption) return this.document.get(this.properties.caption);
  // };
};

Caption.Prototype.prototype = Document.Composite.prototype;
Caption.prototype = new Caption.Prototype();
Caption.prototype.constructor = Caption;

Document.Node.defineProperties(Caption.prototype, ["title", "children"]);

module.exports = Caption;
