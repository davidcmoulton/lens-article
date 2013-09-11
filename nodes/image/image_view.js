"use strict";

var NodeView = require("../node").View;
var $$ = require("substance-application").$$;


// Substance.Image.View
// ==========================================================================

var ImageView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.addClass('image');
  this.$el.attr('id', this.node.id);
};

ImageView.Prototype = function() {

  // Rendering
  // =============================
  //

  var _indexOf = Array.prototype.indexOf;

  // Render Markup
  // --------
  //
  // div.content
  //   div.img-char
  //     .img

  this.render = function() {
    NodeView.prototype.render.call(this);

    if (this.captionView) {
      this.captionView.dispose();
    }

    var imgChar = $$('.image-char');
    // document.createElement('div');
    // imgChar.className = 'image-char';
    this._imgChar = imgChar;

    // The thumbnail (medium image)
    var mediumImage = $$('img.medium', {
      src: this.node.url || this.node.medium,
      alt: this.node.title,
      title: this.node.title
    });

    imgChar.appendChild(mediumImage);

    // The large image
    var largeImage = $$('img.large', {
      src: this.node.large_url || this.node.large,
      alt: this.node.title,
      title: this.node.title
    });

    imgChar.appendChild(largeImage);

    this.content.appendChild(imgChar);

    // Add caption if there is any
    if (this.node.caption) {
      var caption = this.viewFactory.createView(this.node.caption);
      this.content.appendChild(caption.render().el);
      this.captionView = caption;
    }

    // this._imgPos = _indexOf.call(imgChar.childNodes, img);

    return this;
  };

  this.dispose = function() {
    NodeView.prototype.dispose.call(this);

    console.log('disposing image view...');
    if (this.captionView) {
      this.captionView.dispose();
    }
  };

  this.delete = function(pos, length) {
    var content = this.$('.content')[0];
    var spans = content.childNodes;
    for (var i = length - 1; i >= 0; i--) {
      content.removeChild(spans[pos+i]);
    }
  };

  this.getCharPosition = function(el, offset) {
    // TODO: is there a more general approach? this is kind of manually coded.

    if (el === this._imgChar) {
      return (offset > this._imgPos) ? 1 : 0;
    } else {
      var charPos = this.captionView.getCharPosition(el, offset);
      if (charPos < 0) {
        return charPos;
      } else {
        return charPos + 1;
      }
    }
  };

  this.getDOMPosition = function(charPos) {
    if (charPos === 0) {
      var content = this.$('.content')[0];
      var range = document.createRange();
      range.setStartBefore(content.childNodes[0]);
      return range;
    } else {
      return this.captionView.getDOMPosition(charPos-1);
    }
  };
};

ImageView.Prototype.prototype = NodeView.prototype;
ImageView.prototype = new ImageView.Prototype();

module.exports = ImageView;
