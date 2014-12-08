/*
loader.js
variable 'game' is in global scope - i.e. a property of window.
game is our single global object literal - all other functions and properties of 
the game will be properties of game.
*/
"use strict";

var game =  game || {};

game.KEYBOARD = {
	"KEY_LEFT": 37, 
	"KEY_UP": 38,
	"KEY_RIGHT": 39,
	"KEY_DOWN": 40,
	"KEY_SPACE": 32
};

game.keydown = [];

window.onload = function() {
	
	//hook up everything
	game.SadSpace.game = game;
	game.player.init();
	game.map.init();
	
	//INIT SADSPACE
	game.SadSpace.init();

	
}