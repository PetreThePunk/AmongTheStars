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
	dockingBay: "assets/docking-bay.png",
	airLock: "assets/airlock-no-objects.jpeg",
	storage: "assets/docking-bay.png",
	hallway: "assets/hallway.jpeg",
	controlRoom: "assets/control-room.jpeg",
	bedroom: "assets/livingquarters.jpeg",
	observatory: "assets/docking-bay.png",
	playerSprites: "assets/walk-cycle.png",
	playerSpritesInverse: "assets/walk-cycle-flipped.png",
	ductTape: "assets/duct-tape.png",
	fuel: "assets/fuel.png",
	fuelTank: "assets/fuel-tank.png",
	key: "assets/key.png",
	pipeBusted: "assets/pipe-busted.png",
	pipeFixed: "assets/pipe-fixed.png",
	probes: "assets/probes.png",
	probe: "assets/probesingle.png",
	spaceSuit: "assets/spacesuit.png",
	valve: "assets/valve.png",
	wrench: "assets/wrench.png"
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
		{id: "airLock", src: "airlock-no-objects"},
		{id: "storage", src: "assets/docking-bay"},
		{id: "hallway", src: "assets/hallway"},
		{id: "controlRoom", src: "assets/control-room"},
		{id: "bedroom", src: "assets/livingquarters"},
		{id: "observatory", src: "assets/docking-bay"},
		{id: "playerSprites", src: "assets/walk-cycle"},
		{id: "playerSpritesInverse", src: "assets/walk-cycle-flipped"},
		{id: "ductTape", src: "assets/duct-tape"},
		{id: "fuel", src: "assets/fuel"},
		{id: "fuelTank", src: "assets/fuel-tank"},
		{id: "key", src: "assets/key"},
		{id: "pipeBusted", src: "assets/pipe-busted"},
		{id: "pipeFixed", src: "assets/pipe-fixed"},
		{id: "probes", src: "assets/probes"},
		{id: "probe", src: "assets/probesingle"},
		{id: "spaceSuit", src: "assets/spacesuit"},
		{id: "valve", src: "assets/valve"},
		{id: "wrench", src: "assets/wrench"}
		
	]);
	
}