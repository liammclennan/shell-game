var Board, Cup, Operator, Pea, ShuffleObject, templates;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
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
  ShuffleObject.prototype.move = function(position, offset) {
    return this._animate(this.el, position, offset);
  };
  ShuffleObject.prototype._animate = function(element, position, offset) {
    element.css('top', offset);
    return element.animate({
      left: this.container[position]
    }, this.container.speed, __bind(function() {
      element.css('top', this.container.vertical_baseline());
      return this.position = position;
    }, this));
  };
  ShuffleObject.prototype._render = function() {
    return this.el = $(this._markup()).css('left', this.container[this.position]).appendTo($('body'));
  };
  return ShuffleObject;
})();
Cup = (function() {
  __extends(Cup, ShuffleObject);
  function Cup(container, position, operator) {
    this.container = container;
    this.position = position;
    this.operator = operator;
    Cup.__super__.constructor.call(this, this.container, this.position);
    this.el.click(__bind(function() {
      return this.operator.reveal(this.pea != null);
    }, this));
  }
  Cup.prototype.hide = function(pea) {
    this.pea = pea;
  };
  Cup.prototype.move = function(position, offset) {
    if (this.pea != null) {
      this._move_pea(position, offset);
    }
    return Cup.__super__.move.call(this, position, offset);
  };
  Cup.prototype._move_pea = function(position, offset) {
    return this._animate(this.pea.el, position, offset);
  };
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
  }
  Board.prototype.vertical_baseline = function() {
    return 100;
  };
  Board.prototype.high = function() {
    return this.vertical_baseline() + 50;
  };
  Board.prototype.low = function() {
    return this.vertical_baseline() - 50;
  };
  return Board;
})();
Pea = (function() {
  __extends(Pea, ShuffleObject);
  function Pea() {
    Pea.__super__.constructor.apply(this, arguments);
  }
  Pea.prototype.forward = function() {
    return this.el.css('z-index', 2);
  };
  Pea.prototype.backward = function() {
    return this.el.css('z-index', 0);
  };
  Pea.prototype._markup = function() {
    return templates.pea_markup;
  };
  return Pea;
})();
templates = {
  cup_markup: '<img src="images/cup.png" alt="cup" class="cup" />',
  pea_markup: '<img src="images/ball.png" alt="pea" class="pea" />',
  tick_markup: '<img src="images/tick.jpg" alt="success" class="result" width="100px" height=="100px"/>',
  cross_markup: '<img src="images/cross.jpg" alt="failure" class="result" width="100px" height=="100px" />'
};
Operator = (function() {
  function Operator(speed) {
    this.speed = speed;
    this.board = new Board();
    this.left = new Cup(this.board, 'left', this);
    this.centre = new Cup(this.board, 'centre', this);
    this.right = new Cup(this.board, 'right', this);
    this.pea = new Pea(this.board, 'right');
    this.right.hide(this.pea);
    setTimeout(__bind(function() {
      return this.pea.el.css('z-index', 0);
    }, this), 500);
  }
  Operator.prototype.shuffle = function(times) {
    var count, _results;
    this._reset();
    _results = [];
    for (count = 1; count <= 5; count++) {
      _results.push(setTimeout(__bind(function() {
        return this._swap();
      }, this), (this.speed * count) + 10));
    }
    return _results;
  };
  Operator.prototype.reveal = function(success) {
    this.pea.forward();
    return this._display_result(success);
  };
  Operator.prototype._reset = function() {
    this.pea.backward();
    return $('.result').remove();
  };
  Operator.prototype._display_result = function(success) {
    return $(success ? templates.tick_markup : templates.cross_markup).appendTo('body');
  };
  Operator.prototype._swap = function() {
    var from, left_hand, right_hand, to, _ref;
    left_hand = right_hand = this._select_cup();
    while (left_hand === right_hand) {
      right_hand = this._select_cup();
    }
    _ref = [left_hand.position, right_hand.position], from = _ref[0], to = _ref[1];
    left_hand.move(to, this.board.high());
    return right_hand.move(from, this.board.low());
  };
  Operator.prototype._select_cup = function() {
    var val;
    val = Math.random();
    if (val < 1 / 3) {
      return this.left;
    }
    if ((1 / 3 <= val && val < 2 / 3)) {
      return this.centre;
    }
    return this.right;
  };
  return Operator;
})();
$(function() {
  var o;
  o = new Operator(500);
  return $('#shuffle').click(function() {
    return o.shuffle();
  });
});