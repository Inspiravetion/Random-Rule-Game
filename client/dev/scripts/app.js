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
  var h = new Hand();
  h.show(50, 50, 50);
  console.log(h);
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
