class ShuffleObject
  constructor: (@container, @position) ->
    @_render()
    
  _render: ->
    $(@_markup()).css('left', @container[@position]).appendTo($('body'));

class Cup extends ShuffleObject
  _markup: ->
      templates.cup_markup
  
class Board
  constructor: ->
    @left = 50
    @centre = $('body').width() / 2 - 200
    @right = $('body').width() -  450
    console.log "#{@left} #{@centre} #{@right}"

class Pea extends ShuffleObject
    _markup: ->
      templates.pea_markup
    
templates =
  cup_markup: '<img src="images/cup.png" alt="cup" class="cup" />'



$ ->
  board = new Board()
  one = new Cup(board, 'left')
  two = new Cup(board, 'centre')
  three = new Cup(board, 'right')
