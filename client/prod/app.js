(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.Object.defineProperty( Element.prototype, 'documentOffsetTop', {
    get: function () { 
        return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop - this.offsetParent.offsetTop : 0 );
    }
} );

window.Object.defineProperty( Element.prototype, 'documentOffsetLeft', {
    get: function () { 
        return this.offsetLeft + ( this.offsetParent ? this.offsetParent.documentOffsetLeft - this.offsetParent.offsetLeft : 0 );
    }
} );

var Game = require('game'),
    Hand = require('hand'),
    AI   = require('ai');

//=============================================================================
//APP LOGIC

var gui = {
  buttons: {
    tutorial: '#tutorial',
    newgame: '#newgame'
  },
  modals: {
    tutorial: {
      id: '#tutorial-modal'
    },
    newgame: {
      id: '#newgame-modal',
      controls: {
        toggle_notes: '#toggle-notes-btn'
      },
      notes: '#notes-container',
      middle: {
        top: {
          id: "#game-screen-top"
        }, 
        bottom: {
          id: "#game-screen-bottom"
        }, 
        id: "game-screen-mid"
      },
      side: {
        left: {
          id: '#game-screen-side-left'
        },
        right: {
          id: '#game-screen-side-right'
        }
      }
    },
    events: {
      shown: 'shown.bs.modal'
    }
  } 
}

//App entry point
window.onload = function(){
  setupGUI();
}

function setupGUI(){
  setupButtons();
  setupModals();
}

function setupButtons(){
  //show tutorial modal when tutorial button is clicked
  $(gui.buttons.tutorial)[0].onclick = function(){
    $(gui.modals.tutorial.id).modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  //show newgame modal when new modal is clicked
  $(gui.buttons.newgame)[0].onclick = function(){
    $(gui.modals.newgame.id).modal({
      backdrop: 'static',
      keyboard: false
    });
  }
}

function setupModals() {
  setupTutorialModal();
  setupGameModal();
}

function setupTutorialModal(){
  $(gui.modals.tutorial.id).on(gui.modals.events.shown, function(e){
    //run this function when the tutorial modal becomes visible
  });
}

function setupGameModal(){
  $(gui.modals.newgame.id).on(gui.modals.events.shown, function(e){

    //BE SURE TO REMOVE
    window.ai = new AI(new Player('charlie'));

  });

  $(gui.modals.newgame.controls.toggle_notes)[0].onclick = function(){
    var baseline, start, delta;

    baseline = $(gui.modals.newgame.notes);
    start = baseline[0].documentOffsetTop;
    baseline.toggleClass('closed');
    delta = start - baseline[0].documentOffsetTop; 

    shiftDownChildren($(gui.modals.newgame.middle.bottom.id).children(), delta);
    shiftDownChildren($(gui.modals.newgame.side.left.id).children(), delta / 2);
    shiftDownChildren($(gui.modals.newgame.side.right.id).children(), delta / 2);
  }
}

function shiftDownChildren(children, delta){
  for (var i = children.length - 1; i >= 0; i--) {
    children[i].style.top = parseInt(children[i].style.top) - delta + 'px';
  };
}
//=============================================================================
//HELPERS
//
//
//1.open modal
//    => Make new users 
//    => Make new AI and give it users
//      =>make new Game and give users new hand based off the game
//        =>for each card set the click listener to call playCard(my_index) on its hand
//        =>when each card is played play it in the AI as well
//
//
var Player = function(name){
    this.rounds_won = 0;
    this.name = name;
    this.is_turn = false;
}
//
//
//
//
//
//

},{"ai":2,"game":4,"hand":5}],2:[function(require,module,exports){

//PROTOTYPAL ADDS
//==============================================================================

Object.defineProperty( Array.prototype, 'last', {
  value: function(){
    return this.length > 0 ? this[this.length - 1] : null; 
  },
  enumerable: false
});

Object.defineProperty( Array.prototype, 'getRandom', {
  value: function(prev_idxs){
    var min, max, rand;

    if(this.length == 0 || (prev_idxs && prev_idxs.length == this.length)){
        return;
    }

    min = 0;
    max = this.length;
    rand = Math.floor(Math.random() * (max - min)) + min;

    if(!prev_idxs){
      return this[rand];
    }

    while(prev_idxs.contains(rand)){
        rand = Math.floor(Math.random() * (max - min)) + min;
    }

    prev_idxs.push(rand);
    return this[rand];
  },
  enumerable: false
});

Object.defineProperty( Array.prototype, 'getUniqueRandomValues', {
  value: function(num_vals){
    var prev, vals;

    prev = [];
    vals = [];

    for(var i = 0; i < num_vals; i++){
        vals.push(this.getRandom(prev));
    }

    return vals;
  },
  enumerable: false
});

Object.defineProperty( Array.prototype, 'getRandomValues', {
  value: function(num_vals){
    var vals;

    vals = [];

    for(var i = 0; i < num_vals; i++){
        vals.push(this.getRandom());
    }

    return vals;
  },
  enumerable: false
});

Object.defineProperty( Array.prototype, 'contains', {
  value: function(obj){
    return this.indexOf(obj) != -1;
  },
  enumerable: false
});

//GAME CLASSES
//==============================================================================
var Hand = require('hand');


var AI = function(player){
    var players = [];
    players.push(player);
    players.push(new Player('player 1'));
    players.push(new Player('player 2'));
    players.push(new Player('player 3'));

    this.level = 0;
    this.played_turns = 0;
    this.game = new Game(this.level, players, this);

    this.nextRound();
}

AI.prototype.nextGame = function() {
    this.level++;
    this.game = new Game(this.level, this.game.players);
};

AI.prototype.nextRound = function() {
    if(this.game.curr_round){
        this.game.addRound(this.game.curr_round);
    }

    this.game.rounds.push(new Round());
};

AI.prototype.playCard = function(player, card) {
    this.game.rounds.last().playTurn(player, card);

    if(this.played_turns != 3){
        this.played_turns++;
    } else {
        this.played_turns = 0;
        console.log(this.pickRoundWinner());
    }
};

AI.prototype.pickRoundWinner = function() {
    var winner = null;

    this.game.round_rules.forEach(function(rule){
        winner = (rule.pickWinner(this.game) || winner);
    }.bind(this));

    this.game.rounds.last().winner = winner;
    return winner;
};

AI.prototype.pickGameWinner = function() {
    return this.game.hand_rule.pickWinner(this.game);
};


/**
 * A Game holds all of the state for the current game being played. This includes
 * the rules of the game and the rounds that have been played in order.
 * @param {int} level 
 */
var Game = function(level, players, ai){
    this.round_rules = this.getRoundRules(level + 3);
    this.hand_rule = this.getHandRule();
    this.rounds = [];
    this.players = players;
    this.curr_round = null;

    this.newHand(ai);
}

Game.prototype.getRoundRules = function(num_rules) {
    return ROUNDRULES;//.getUniqueRandomValues(num_rules);
};

Game.prototype.getHandRule = function() {
    return HANDRULES[0];//.getRandom([]);
};

Game.prototype.addRound = function(round) {
    this.rounds.push(round);
};

Game.prototype.newHand = function(ai) {
    var btm, top,lft, rght;

    btm = new Hand(13, {
      user_card: true,
      rotate: false,
      position: 'bottom',
      player: this.players[0],
      ai: ai
    }).show($("#game-screen-bottom")[0], 50);

    lft = new Hand(13, {
      user_card: false,
      rotate: true,
      position: 'left',
      player: this.players[1],
      ai: ai
    }).show($('#game-screen-side-left')[0], 50);

    top = new Hand(13, {
      user_card: false,
      rotate: false,
      position: 'top',
      player: this.players[2],
      ai: ai
    }).show($("#game-screen-top")[0], 50);

    rght = new Hand(13, {
      user_card: false,
      rotate: true,
      position: 'right',
      player: this.players[3],
      ai: ai
    }).show($('#game-screen-side-right')[0], 50);
};


/**
 * Round holds the information for each round of play. A round ends once every
 * player has played a card.
 */
var Round = function(){
    this.turns = [];
    this.winner = null;
}

Round.prototype.playTurn = function(player, card) {
    this.turns.push({ 'player' : player, 'card': card });
};



/**
 * Rule to determine who won either a hand or a round
 * @param {function} solver function that takes a game and determines the winner 
 * of either the current round or of the whole hand
 */
var Rule = function(solver){
    this.solver = solver
}

Rule.prototype.pickWinner = function(game) {
    return this.solver(game);
};


//GAME CONSTANTS
//==============================================================================
function highCardWins(game){
    var round, winner;

    winner = null;
    round = game.rounds.last();
    
    round.turns.forEach(function(turn){
        if(!winner){
            winner = turn;
        }

        if(winner.card.value < turn.card.value){
            winner = turn;
        }
    });

    return winner;
}

function eightsAreWild(game){
    var round, winner;

    winner = null;
    round = game.rounds.last();

    round.turns.forEach(function(turn){
        if(turn.card.value == 8 && (!winner || winner.card.value != 8)){
            winner = turn;
        }
    });

    return winner;
}

var ROUNDRULES = [
    new Rule(highCardWins),
    new Rule(eightsAreWild)
]

function MostRounds(game){
    var rounds, winner;

    rounds = game.rounds;

    winner = rounds[0].winner
    rounds.forEach(function(round){
        round.winner.player.rounds_won++

        if(winner.player.rounds_won < round.winner.player.rounds_won){
            winner = round.winner;
        }
    });

    return winner.player;
}

var HANDRULES = [
    new Rule(MostRounds)
]

module.exports = AI;


var Player = function(name){
    this.rounds_won = 0;
    this.name = name;
    this.is_turn = false;
}



},{"hand":5}],3:[function(require,module,exports){
//Cards are responsive as long as their height:width ratio stays 10:6
//Card type pictures need to be squares but can be swapped out

function Card(id, user_card, rotate, val, src){
  this.user_card = user_card;
  this.value  = val;
  this.src = src;
  this.elem = this.buildCard(id, user_card, rotate);
}

Card.prototype.show = function() {
  if(!this.user_card){
    $(this.elem).css({'background-color' : 'white'});
    this.elem.appendChild(this.buildTopContainer());
    this.elem.appendChild(this.buildMidContainer());
    this.elem.appendChild(this.buildBtmContainer());
  }
};

Card.prototype.unshow = function() {
  $(this.elem).empty();
  $(this.elem).css({'background-color' : 'red'});
};

Card.prototype.buildCard = function(id, user_card, rotate){
  var cardContainer;

  cardContainer = $('<div/>', {
    id: id,
    class: 'card' + (rotate ? '-rotate' : '')
  });

  if(user_card){

    cardContainer.hover(
    function(){
      var t = parseInt(this.style.top) - 30;
      this.style.top = t + 'px';
    },
    function(){
      var t = parseInt(this.style.top) + 30;
      this.style.top = t + 'px';
    });  

    cardContainer = cardContainer[0];
    cardContainer.appendChild(this.buildTopContainer());
    cardContainer.appendChild(this.buildMidContainer());
    cardContainer.appendChild(this.buildBtmContainer());
  } else {
    cardContainer.css({ 'background-color' : 'red' });
    cardContainer = cardContainer[0];
  }

  return cardContainer;
}

Card.prototype.buildTopContainer = function(){
  var topContainer, type;

  topContainer = $('<div/>', {
    class: 'card-top-container'
  })[0];

  type = $('<img/>', {
    class: 'small-card-type abs-left',
    src: this.src
  })[0];

  topContainer.appendChild(type);

  return topContainer;
}

Card.prototype.buildMidContainer = function(){
  var midContainer, type;

  midContainer = $('<div/>', {
    class: 'card-mid-container'
  })[0];

  type = $('<img/>', {
    class: 'large-card-type',
    src: this.src
  })[0];

  midContainer.appendChild(type);

  return midContainer;
}

Card.prototype.buildBtmContainer = function(){
  var btmContainer, type;

  btmContainer = $('<div/>', {
    class: 'card-btm-container'
  })[0];

  type = $('<img/>', {
    class: 'small-card-type abs-right',
    src: this.src
  })[0];

  btmContainer.appendChild(type);

  return btmContainer;
}

module.exports = Card;

},{}],4:[function(require,module,exports){
var Hand = require('hand');

function Game(){
  this.players = [];
}




module.exports = Game;

},{"hand":5}],5:[function(require,module,exports){
var Card = require('cards');

var CARDVALUES = [
  { val: 1, src: 'prod/images/1.jpg' },
  { val: 2, src: 'prod/images/2.jpg' },
  { val: 3, src: 'prod/images/3.jpg' },
  { val: 4, src: 'prod/images/4.jpg' },
  { val: 5, src: 'prod/images/5.jpg' },
  { val: 6, src: 'prod/images/6.jpg' },
  { val: 7, src: 'prod/images/7.jpg' },
  { val: 8, src: 'prod/images/8.jpg' },
  { val: 9, src: 'prod/images/9.jpg' },
  { val: 10, src: 'prod/images/10.jpg' }
];

function Hand(size, opts){
  this.cards = [];
  this.user_card = opts.user_card;
  this.rotate = opts.rotate;
  this.position = opts.position;
  this.player = opts.player;
  this.ai = opts.ai;

  CARDVALUES.getRandomValues(size).forEach(function(cardInfo, i){
    var card = new Card(i, this.user_card, this.rotate, cardInfo.val, cardInfo.src);

    // if(this.position == "bottom"){
      card.elem.onclick = function(index){
        // if(this.player.is_turn){
          this.playCard(index);
        // }
      }.bind(this,[i]);
    // }
    
    this.cards.push(card);
  }.bind(this));
}

Hand.prototype.show = function(anchor){
  var startx, starty, cardSz, neededLength, padding, shift, outter;

  shift = this.user_card ? 50 : 20;
  startx = anchor.documentOffsetLeft;
  starty = anchor.documentOffsetTop;

  cardSz = this.rotate ? getInDomHeight(this.cards[0].elem) : getInDomWidth(this.cards[0].elem);
  neededLength = cardSz + ((this.cards.length - 1) * shift);

  outter = this.rotate ? anchor.getBoundingClientRect().height : anchor.getBoundingClientRect().width;
  padding = (outter - neededLength) / 2;

  if(this.rotate){
    startx += (anchor.getBoundingClientRect().width - cardSz) * 1.9;
    starty += padding;
  } else {
    startx += padding;
    starty += 10;
  }

  this.cards.forEach(function(card, i){
    var e = card.elem;

    e.style.position = 'absolute';

    if(this.rotate){
      e.style.top      = starty + 'px';
      e.style.left     = startx + 'px';
      starty += shift;
    } else {
      e.style.top      = starty + 'px';
      e.style.left     = startx + 'px';
      startx += shift;
    }

    anchor.appendChild(e);
  }.bind(this));

  return this;
}

Hand.prototype.playCard = function(i) {
  switch(this.position){
    case "left":
      this.playLeftCard(i);
      break;
    case "right":
      this.playRightCard(i);
      break;
    case "top":
      this.playTopCard(i);
      break;
    case "bottom":
      this.playBottomCard(i);
      break; 
  }

  this.ai.playCard(this.player, this.cards[i]);
};

function getInDomWidth(elem){
  var width, e;

  e = $(elem).clone(false);
  e.css({visibility: 'hidden'});

  e.appendTo('body');
  width = e.width();
  e.remove();

  return width;
}

function getInDomHeight(elem){
  var width, e;

  e = $(elem).clone(false);
  e.css({visibility: 'hidden'});

  e.appendTo('body');
  width = e.height();
  e.remove();

  return width;
}

Hand.prototype.playLeftCard = function(i){
  var children, parent, newTop, newLeft;

  parent = $('#game-screen-side-left');
  children = parent.children();

  newTop = (parent.height() / 2) -  (parseInt($(children[i]).height()) / 2) + 'px';
  newLeft = parseInt(children[i].style.left) + (parseInt($(children[i]).height()) * 1.5) + 'px';

  children[i].style.top = newTop;
  children[i].style.left = newLeft;
  this.cards[i].show();
}

Hand.prototype.playRightCard = function(i){
  var children, parent, newTop, newLeft;

  parent = $('#game-screen-side-right');
  children = parent.children();

  newTop = (parent.height() / 2) -  (parseInt($(children[i]).height()) / 2) + 'px';
  newLeft = parseInt(children[i].style.left) - (parseInt($(children[i]).height()) * 1.5) + 'px';

  children[i].style.top = newTop;
  children[i].style.left = newLeft;
  this.cards[i].show();
}

Hand.prototype.playTopCard = function(i){
  var children, parent, newTop, newLeft;

  parent = $('#game-screen-top');
  children = parent.children();

  newLeft = (parent.width() / 2) + $('#game-screen-side-left').width() -  (parseInt($(children[i]).width()) / 1) + 'px';
  newTop = parseInt(children[i].style.top) + parseInt($(children[i]).height()) + 10 + 'px';

  children[i].style.top = newTop;
  children[i].style.left = newLeft;
  this.cards[i].show();
}

Hand.prototype.playBottomCard = function(i){
  var children, parent, newTop, newLeft;

  console.log(i);

  parent = $("#game-screen-bottom");
  children = parent.children();

  newLeft = (parent.width() / 2) + $('#game-screen-side-left').width() -  (parseInt($(children[i]).width()) / 3) + 'px';
  newTop = parseInt(children[i].style.top) - parseInt($(children[i]).height()) - 10 + 'px';

  children[i].style.top = newTop;
  children[i].style.left = newLeft;
}

module.exports = Hand;
},{"cards":3}]},{},[1])