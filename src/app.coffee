
class Cup
  constructor: (@container, @position) ->
    @_render()
    
  _render: ->
    $(templates.cup_markup).appendTo($('body'));
    null
  
class Board
  
  
templates =
  cup_markup: '<img src="images/cup.png" alt="cup" />'

# comment

$ ->
  one = new Cup(new Board(), 'left')
