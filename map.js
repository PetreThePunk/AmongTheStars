/* Player file 
 * the player character for the game
 */
 "use strict";
 
 //If there isn't a game object add one
 var game = game || {};
 
 //Player Obj
 game.map = {
	rooms: [],
	currentRoom: 3,
	//Initialize function for the start of the game
	init: function() {
		this.rooms[0] = new game.Room("Docking Bay", "dockingBay",
						{ left: 10, right: 630, top: 170, bot: 360 }, 
						[{ x: -100, y: 250, room: 1}, { x: 630, y: 250, room: 2}] );
						
		this.rooms[1] = new game.Room("Airlock", "airLock", 
						{ left: 10, right: 630, top: 240, bot: 360 }, 
						[{ x: 630, y: 250, room: 0},{ x: 10, y: 250, room: 7},] );
						
		this.rooms[2] = new game.Room("Hallway Alpha", "hallway",
						{ left: 10, right: 630, top: 240, bot: 360 }, 
						[{ x: 320, y: 350, room: 0}, { x: 320, y: 250, room: 3},
						{ x: 10, y:250, room: 4}, { x: 630, y:250, room: 5}] );
		
		this.rooms[3] = new game.Room("Bedroom", "bedroom",
						{ left: 10, right: 630, top: 240, bot: 360 }, 
						[{ x: 630, y: 350, room: 2}] );
						
		this.rooms[4] = new game.Room("Control Room", "controlRoom",
						{ left: 10, right: 630, top: 240, bot: 360 }, 
						[{ x: 630, y: 250, room: 2}] );
						
		this.rooms[5] = new game.Room("Observatory", "observatory",
						{ left: 10, right: 630, top: 240, bot: 360 }, 
						[{ x: 10, y: 250, room: 2}, { x: -630, y: 250, room: 6}] );
						
		this.rooms[6] = new game.Room("Storage", "storage",
						{ left: 10, right: 630, top: 240, bot: 360 }, 
						[{ x: 10, y: 250, room: 5}]);
		this.rooms[7] = new game.Room("Space", "bedroom",
						{ left: 10, right: 630, top: 240, bot: 360 }, 
						[]);
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
		//If player can exit change indicator color
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
			
			game.SadSpace.textToDraw=name;
			game.SadSpace.textDisplayTime=1;
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
		var returnVal = false;
		thisRoom.exits.forEach( function(exit) {
			if( player.inRange( exit.x, exit.y) && 
				self.checkMouseHover( exit.x, exit.y, 20, mouse) ){
					self.changeRoom( player, exit.room );
					returnVal = true;
			}
		});
		
		return returnVal;
	},
	
	changeRoom: function( player, roomNum ) {
		var oldRoom = this.currentRoom;
		this.currentRoom = roomNum;
		
		//check position of door for old room in current room
		var wasChanged = false;
		for(var i = 0; this.rooms[roomNum].exits.length; i++)
			if(this.rooms[roomNum].exits[i].room == oldRoom)
			{
				wasChanged = true;
				break;
			}
		if(wasChanged)
		{
			player.x = this.rooms[roomNum].exits[i].x;
			player.y = this.rooms[roomNum].exits[i].y;
		}
		player.target.x = player.x;
		player.target.y = player.y;
	}
	
 };