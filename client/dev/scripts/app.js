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
    var flex = $(gui.modals.newgame.notes).css('flex-grow');
    if (flex == 0) {
      $(gui.modals.newgame.notes).css({'flex-grow': '1'});
    } else {
      $(gui.modals.newgame.notes).css({'flex-grow': '0'});
    }
  }
}

//=============================================================================
//HELPERS
