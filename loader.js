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

game.IMAGES = {
	dockingBay: "assets/docking-bay.jpg",
	airLock: "assets/docking-bay.jpg",
	storage: "assets/docking-bay.jpg",
	hallway: "assets/docking-bay.jpg",
	controlRoom: "assets/docking-bay.jpg",
	bedroom: "assets/docking-bay.jpg",
	laboratory: "assets/docking-bay.jpg"
};

game.keydown = [];

window.onload = function() {
	
	//hook up everything
	game.SadSpace.game = game;
	game.player.init();
	game.map.init();
	
	//INIT SADSPACE
	game.SadSpace.init();
	//Get that asset loading going on
	game.queue = new createjs.LoadQueue( false );
	game.queue.installPlugin( createjs.Sound );
	game.queue.on( "complete", function() {

	});
	game.queue.loadManifest([
		{id: "dockingBay", src: "assets/docking-bay"},
		{id: "airLock", src: "assets/docking-bay"},
		{id: "storage", src: "assets/docking-bay"},
		{id: "hallway", src: "assets/docking-bay"},
		{id: "controlRoom", src: "assets/docking-bay"},
		{id: "bedroom", src: "assets/docking-bay"},
		{id: "laboratory", src: "assets/docking-bay"}
	]);
	
}