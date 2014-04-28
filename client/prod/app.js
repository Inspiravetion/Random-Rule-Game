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
    Hand = require('hand');

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
        }
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
    new Hand(13, true, false).show($(gui.modals.newgame.middle.bottom.id)[0], 50);
    new Hand(13, false, false).show($(gui.modals.newgame.middle.top.id)[0], 50);
    new Hand(13, false, true).show($(gui.modals.newgame.side.left.id)[0], 50);
    new Hand(13, false, true).show($(gui.modals.newgame.side.right.id)[0], 50);
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

},{"game":3,"hand":4}],2:[function(require,module,exports){
//Cards are responsive as long as their height:width ratio stays 10:6
//Card type pictures need to be squares but can be swapped out

function Card(id, user_card, rotate){
  this.elem = buildCard(id, user_card, rotate);
  this.suit = null;
  this.val  = null;
}

function buildCard(id, user_card, rotate){
  var cardContainer;

  cardContainer = $('<div/>', {
    id: id,
    class: 'card' + (rotate ? '-rotate' : '')
  });

  cardContainer.hover(
    function(){
      var t = parseInt(this.style.top) - 30;
      this.style.top = t + 'px';
    },
    function(){
      var t = parseInt(this.style.top) + 30;
      this.style.top = t + 'px';
    });

  if(user_card){
    cardContainer = cardContainer[0];
    cardContainer.appendChild(buildTopContainer());
    cardContainer.appendChild(buildMidContainer());
    cardContainer.appendChild(buildBtmContainer());
  } else {
    cardContainer.css({ 'background-color' : 'red' });
    cardContainer = cardContainer[0];
  }

  return cardContainer;
}

function buildTopContainer(){
  var topContainer, type;

  topContainer = $('<div/>', {
    class: 'card-top-container'
  })[0];

  type = $('<img/>', {
    class: 'small-card-type abs-left',
    src: 'prod/images/default_card_type.png'
  })[0];

  topContainer.appendChild(type);

  return topContainer;
}

function buildMidContainer(){
  var midContainer, type;

  midContainer = $('<div/>', {
    class: 'card-mid-container'
  })[0];

  type = $('<img/>', {
    class: 'large-card-type',
    src: 'prod/images/default_card_type.png'
  })[0];

  midContainer.appendChild(type);

  return midContainer;
}

function buildBtmContainer(){
  var btmContainer, type;

  btmContainer = $('<div/>', {
    class: 'card-btm-container'
  })[0];

  type = $('<img/>', {
    class: 'small-card-type abs-right',
    src: 'prod/images/default_card_type.png'
  })[0];

  btmContainer.appendChild(type);

  return btmContainer;
}

module.exports = Card;

},{}],3:[function(require,module,exports){
var Hand = require('hand');

function Game(){
  this.players = [];
}




module.exports = Game;

},{"hand":4}],4:[function(require,module,exports){
var Card = require('cards');

function Hand(size, user_card, rotate){
  this.cards = [];
  this.user_card = user_card;
  this.rotate = rotate;

  for(var i = 0; i < size; i++){
    this.cards.push(new Card(i, user_card, rotate));
  }
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
    startx += 10;
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
}

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

module.exports = Hand;
},{"cards":2}]},{},[1])