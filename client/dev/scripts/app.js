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
    new Hand(13, true, false).show($(gui.modals.newgame.middle.bottom.id)[0], 50);
    new Hand(13, false, false).show($(gui.modals.newgame.middle.top.id)[0], 50);
    new Hand(13, false, true).show($(gui.modals.newgame.side.left.id)[0], 50);
    new Hand(13, false, true).show($(gui.modals.newgame.side.right.id)[0], 50);

    setTimeout(function(){
      playLeftCard(4);
      playRightCard(4);
      playTopCard(4);
      playBottomCard(4);
    }, 2000);
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

function playLeftCard(i){
  var children, parent, newTop, newLeft;

  parent = $(gui.modals.newgame.side.left.id);
  children = parent.children();

  newTop = (parent.height() / 2) -  (parseInt($(children[i]).height()) / 2) + 'px';
  newLeft = parseInt(children[i].style.left) + (parseInt($(children[i]).width()) * 1.5) + 'px';

  children[i].style.top = newTop;
  children[i].style.left = newLeft;
}

function playRightCard(i){
  var children, parent, newTop, newLeft;

  parent = $(gui.modals.newgame.side.right.id);
  children = parent.children();

  newTop = (parent.height() / 2) -  (parseInt($(children[i]).height()) / 2) + 'px';
  newLeft = parseInt(children[i].style.left) - (parseInt($(children[i]).width()) * 1.5) + 'px';

  children[i].style.top = newTop;
  children[i].style.left = newLeft;
}

function playTopCard(i){
  var children, parent, newTop, newLeft;

  parent = $(gui.modals.newgame.middle.top.id);
  children = parent.children();

  newLeft = (parent.width() / 2) + $(gui.modals.newgame.side.left.id).width() -  (parseInt($(children[i]).width()) / 1.5) + 'px';
  newTop = parseInt(children[i].style.top) + parseInt($(children[i]).height()) + 10 + 'px';

  children[i].style.top = newTop;
  children[i].style.left = newLeft;
}

function playBottomCard(i){
  var children, parent, newTop, newLeft;

  parent = $(gui.modals.newgame.middle.bottom.id);
  children = parent.children();

  newLeft = (parent.width() / 2) + $(gui.modals.newgame.side.left.id).width() -  (parseInt($(children[i]).width()) / 2.5) + 'px';
  newTop = parseInt(children[i].style.top) - parseInt($(children[i]).height()) - 10 + 'px';

  children[i].style.top = newTop;
  children[i].style.left = newLeft;
}
//=============================================================================
//HELPERS
