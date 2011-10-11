var Board, Cup, Pea, ShuffleObject, templates;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
ShuffleObject = (function() {
  function ShuffleObject(container, position) {
    this.container = container;
    this.position = position;
    this._render();
  }
  ShuffleObject.prototype._render = function() {
    return $(this._markup()).css('left', this.container[this.position]).appendTo($('body'));
  };
  return ShuffleObject;
})();
Cup = (function() {
  __extends(Cup, ShuffleObject);
  function Cup() {
    Cup.__super__.constructor.apply(this, arguments);
  }
  Cup.prototype._markup = function() {
    return templates.cup_markup;
  };
  return Cup;
})();
Board = (function() {
  function Board() {
    this.left = 50;
    this.centre = $('body').width() / 2 - 200;
    this.right = $('body').width() - 450;
    console.log("" + this.left + " " + this.centre + " " + this.right);
  }
  return Board;
})();
Pea = (function() {
  __extends(Pea, ShuffleObject);
  function Pea() {
    Pea.__super__.constructor.apply(this, arguments);
  }
  Pea.prototype._markup = function() {
    return templates.pea_markup;
  };
  return Pea;
})();
templates = {
  cup_markup: '<img src="images/cup.png" alt="cup" class="cup" />',
  pea_markup: '<img src="images/ball.png" alt="pea" class="pea" />'
};
$(function() {
  var board, one, pea, three, two;
  board = new Board();
  one = new Cup(board, 'left');
  two = new Cup(board, 'centre');
  three = new Cup(board, 'right');
  return pea = new Pea(board, 'right');
});