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
						{ left: 10, right: 630, top: 240, bot: 360 }, 
						[{ x: -100, y: 300, room: 1}, { x: 630, y: 300, room: 2}] );
						
		this.rooms[1] = new game.Room("Airlock", "nada", 
						{ left: 10, right: 630, top: 240, bot: 360 }, 
						[{ x: 630, y: 300, room: 0}] );
						
		this.rooms[2] = new game.Room("Doors", "nada",
						{ left: 10, right: 630, top: 240, bot: 360 }, 
						[{ x: 10, y: 300, room: 0}] );
	},
	
	draw: function( ctx, mouse, player ) {
		var self = this;
		var thisRoom = this.rooms[this.currentRoom];
		thisRoom.draw( ctx );
		player.draw( ctx );
		thisRoom.exits.forEach( function( exit ) {
			self.drawExitButton( ctx, exit.x, exit.y, mouse, 
								self.rooms[exit.room].name, player); 
		});
		
	},
	/**Draws an exit indicator
	 *
	 *@param ctx : drawing context
	 *@param x : x coord of exit button
	 *@param y : y coord of exit button
	 *@param mouse : mosue location obj
	 *@param name : name of exit
	 *@param player : player obj
	 */
	drawExitButton: function( ctx, x, y, mouse, name, player ) {
		var colorString = "#a00";
		//If player can exit change indiactor color
		if( player.inRange( x, y ) )
			colorString = "#0a0";
		
		ctx.fillStyle = colorString;
		ctx.strokeStyle = colorString;
		
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc( x, y, 20, 0, 2*Math.PI );
		ctx.stroke();
		ctx.closePath();
		
		name = "Go To " + name;
		
		//Fill circle if mouse is over
		if( this.checkMouseHover( x, y, 20, mouse ) ) {
			ctx.beginPath();
			ctx.arc( x, y, 20, 0, 2*Math.PI );
			ctx.fill();
			ctx.closePath();
			
			ctx.font = "10px Veranda";
			ctx.fillStyle = "#fff";
			ctx.fillText( name, player.x - (name.length/2 * 5), player.y + 15 ) 
		}
		
		
	},
	/**Draws an exit indicator
	 *
	 *@param ctx : drawing context
	 *@param x : x coord of exit button
	 *@param y : y coord of exit button
	 *@param mouse : mosue location obj
	 *@param name : name of exit
	 *@param player : player obj
	 */
	checkMouseHover: function( x, y, radius, mouse ) {
		var distSq = ( x - mouse.x ) * ( x - mouse.x ) +
					 ( y - mouse.y ) * ( y - mouse.y );
		return ( distSq < ( radius * radius ) );
	},
	
	checkExits: function( mouse, player ) {
		var thisRoom = this.rooms[this.currentRoom];
		var self = this;
		thisRoom.exits.forEach( function(exit) {
			if( player.inRange( exit.x, exit.y) && 
				self.checkMouseHover( exit.x, exit.y, 20, mouse) ){
					self.changeRoom( player, exit.room );
					return true;
			}
		});
		
		return false;
	},
	
	changeRoom: function( player, roomNum ) {
		console.log('ChangeRoom!');
		this.currentRoom = roomNum;
		player.x = 640 - player.x;
		player.target.x = player.x;
		player.target.y = player.y;
	}
	
 };