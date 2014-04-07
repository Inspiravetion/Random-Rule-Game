(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//=============================================================================
//APP LOGIC

//App entry point
window.onload = function(){
  setupConstants();
  setupGUI();
}

function setupConstants(){
  //button id's
  gurantee_namespace('gui.buttons');
  gui.buttons.tutorial = '#tutorial';
  gui.buttons.newgame = '#newgame';

  //modal id's
  gurantee_namespace('gui.modals');
  gui.modals.tutorial = '#tutorial-modal';
  gui.modals.newgame = '#newgame-modal';

  //event id's
  gurantee_namespace('gui.modals.events');
  gui.modals.events.shown = 'shown.bs.modal';
}

function setupGUI(){
  setupButtons();
  setupModals();
}

function setupButtons(){
  //show tutorial modal when tutorial button is clicked
  $(gui.buttons.tutorial)[0].onclick = function(){
    $(gui.modals.tutorial).modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  //show newgame modal when new modal is clicked
  $(gui.buttons.newgame)[0].onclick = function(){
    $(gui.modals.newgame).modal({
      backdrop: 'static',
      keyboard: false
    });
  }
}

function setupModals() {
  $(gui.modals.tutorial).on(gui.modals.events.shown, function(e){
    //run this function when the tutorial modal becomes visible
  });

  $(gui.modals.newgame).on(gui.modals.events.shown, function(e){
    //run this function when the newgame modal becomes visible
  });
}

//=============================================================================
//HELPERS

//guarantee the namespace delimited by '.' exists
function gurantee_namespace(packageStr){
  var packages, scope, packge;
  packages = packageStr.split('.');
  scope = this;
  for(var i = 0; i < packages.length; i++){
    packge = packages[i];
    scope[packge] = scope[packge] || {};
    scope = scope[packge];
  }
}

},{}]},{},[1])