class ShuffleObject
  constructor: (@container, @position) ->
    @_render()
  
  move: (position, offset)->
    @_animate @el, position, offset
  
  _animate: (element, position, offset) ->
    element.css('top', offset)
    element.animate({
      left: @container[position]
    }, @container.speed, =>
      element.css('top', @container.vertical_baseline())
      @position = position
    )
    
  _render: ->
    @el = $(@_markup()).css('left', @container[@position]).appendTo($('body'));


class Cup extends ShuffleObject
  constructor: (@container, @position, @operator) ->
    super @container, @position
    @el.click(=>
      @operator.reveal(@pea?)
    )
  
  hide: (@pea) ->
  
  move: (position, offset) ->
    @_move_pea(position, offset) if @pea?
    super(position, offset)
  
  _move_pea: (position, offset) ->
    @_animate @pea.el, position, offset
  
  _markup: ->
    templates.cup_markup
  
      
class Board
  constructor: ->
    @left = 50
    @centre = $('body').width() / 2 - 200
    @right = $('body').width() -  450
  
  vertical_baseline: -> 100
  
  high: -> @vertical_baseline() + 50
  
  low: -> @vertical_baseline() - 50
  
  
class Pea extends ShuffleObject
  forward: ->
    @el.css 'z-index', 2

  backward: ->
    @el.css 'z-index', 0

  _markup: ->
    templates.pea_markup
  
    
class Operator
  constructor: (@speed)->
    @board = new Board()
    @left = new Cup(@board, 'left', @)
    @centre = new Cup(@board, 'centre', @)
    @right = new Cup(@board, 'right', @)
    pea_position = @_random_position()
    @pea = new Pea(@board, pea_position)
    @[pea_position].hide @pea
    setTimeout(=>
      @pea.el.css('z-index',0)
    , 500)
    
  shuffle: (times) ->
    @_reset()
    for count in [1..5]
      setTimeout(=>
        @_swap()
      , (@speed * count) + 10)
  
  reveal: (success) ->
    @pea.forward()
    @_display_result(success)    
  
  _reset: ->
    @pea.backward()
    $('.result').remove()
    
  _display_result: (success) ->
    $(if success then templates.tick_markup else templates.cross_markup).appendTo('body')
    
  _swap: ->
    left_hand = right_hand = @_select_cup()
    right_hand = @_select_cup() while left_hand == right_hand
    [from,to] = [left_hand.position, right_hand.position]
    left_hand.move(to, @board.high())
    right_hand.move(from, @board.low())

  _select_cup: ->
    @[@_random_position()]
    
  _random_position: ->
    val = Math.random()
    if val < 1/3 then return 'left'
    if 1/3 <= val < 2/3 then return 'centre'
    return 'right'

$ ->
  o = new Operator(500)
  $('#shuffle').click(-> o.shuffle())
  
  
templates =
  cup_markup: '<img src="images/cup.png" alt="cup" class="cup" />',
  pea_markup: '<img src="images/ball.png" alt="pea" class="pea" />'
  tick_markup: '<img src="images/tick.jpg" alt="success" class="result" width="100px" height=="100px"/>'
  cross_markup: '<img src="images/cross.jpg" alt="failure" class="result" width="100px" height=="100px" />'
