/* Player file 
 * the player character for the game
 */
 "use strict";
 
 //If there isn't a game object add one
 var game = game || {};
 
 //Player Obj
 game.map = {
	rooms: [],
	currentRoom: 0,
	//Initialize function for the start of the game
	init: function() {
		console.log("MAP!");
		this.rooms[0] = new game.Room("Docking Bay", "nada",
						{ left: 10, right: 630, top: 240, bot: 480 }, 
						[{ x: 10, y: 300, room: 1}, { x: 630, y: 300, room: 2}] );
						
		this.rooms[1] = new game.Room("Airlock", "nada", 
						{ left: 10, right: 630, top: 240, bot: 480 }, 
						[{ x: 630, y: 300, room: 0}] );
						
		this.rooms[2] = new game.Room("Doors?", "nada",
						{ left: 10, right: 630, top: 240, bot: 480 }, 
						[{ x: 10, y: 300, room: 0}] );
	},
	
	draw: function( ctx, mouse ) {
		var self = this;
		this.rooms[this.currentRoom].draw( ctx );
		this.rooms[this.currentRoom].exits.forEach( function( exit ) {
			self.drawExitButton( ctx, exit.x, exit.y, mouse, self.rooms[self.currentRoom].name); 
		});
		
	},
	
	drawExitButton: function( ctx, x, y, mouse, name ) {
		ctx.fillStyle = "#a00";
		
		if( this.checkMouseHover( x, y, 20, mouse ) ) {
			ctx.beginPath();
			ctx.arc( x, y, 20, 0, 2*Math.PI );
			ctx.fill();
			ctx.closePath();
		}
		
		ctx.strokeStyle = "#a00";
		
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc( x, y, 20, 0, 2*Math.PI );
		ctx.stroke();
		ctx.closePath();
	},
	
	checkMouseHover: function( x, y, radius, mouse ) {
		var distSq = ( x - mouse.x ) * ( x - mouse.x ) + ( y - mouse.y ) * ( y - mouse.y );
		return ( distSq < ( radius * radius ) );
	}
	
 };