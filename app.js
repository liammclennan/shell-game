var Board, Cup, templates;
Cup = (function() {
  function Cup(container, position) {
    this.container = container;
    this.position = position;
    this._render();
  }
  Cup.prototype._render = function() {
    $(templates.cup_markup).appendTo($('body'));
    return null;
  };
  return Cup;
})();
Board = (function() {
  function Board() {}
  return Board;
})();
templates = {
  cup_markup: '<img src="images/cup.png" alt="cup" />'
};
$(function() {
  var one;
  return one = new Cup(new Board(), 'left');
});