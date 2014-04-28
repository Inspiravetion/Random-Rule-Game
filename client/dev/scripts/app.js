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
