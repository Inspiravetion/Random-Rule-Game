(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
      notes: '#notes-container'
    },
    events: {
      shown: 'shown.bs.modal'
    }
  }
}

//App entry point
window.onload = function(){
  setupGUI();
  new Hand().show(50, 50, 50);
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
    //run this function when the newgame modal becomes visible
  });

  $(gui.modals.newgame.controls.toggle_notes)[0].onclick = function(){
    $(gui.modals.newgame.notes).toggleClass('closed');
  }
}

//=============================================================================
//HELPERS

},{"game":3,"hand":4}],2:[function(require,module,exports){
function Card(id){
  return buildCard(id);
}

function buildCard(id){
  var cardContainer;

  cardContainer = $('<div/>', {
    id: id,
    class: 'card'
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

  cardContainer = cardContainer[0];

  cardContainer.appendChild(buildTopContainer());
  cardContainer.appendChild(buildMidContainer());
  cardContainer.appendChild(buildBtmContainer());

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

function Hand(){
  this.cards = [];

  for(var i = 0; i < 13; i++){
    this.cards.push(new Card(i));
  }
}

Hand.prototype.show = function(startx, starty, shiftx){
  this.cards.forEach(function(card, i){
    card.style.position = 'absolute';
    card.style.top      = starty + 'px';
    card.style.left     = startx + 'px';

    startx += shiftx;
    document.body.appendChild(card);
  }); 
}

module.exports = Hand;

},{"cards":2}]},{},[1])