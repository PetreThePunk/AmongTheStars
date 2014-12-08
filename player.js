/* Player file 
 * the player character for the game
 */
 "use strict";
 
 //If there isn't a game object add one
 var game = game || {};
 
 //Player Obj
 game.player = {
	x: 320,
	y: 240,
	target: { x: 0, y: 0 },
	moving: false,
	radius: 15,
	slashRange: 50,
	speed: 150,
	size: 20,
	root2: 0.0,
	//Initialize function for the start of the game
	init: function() {
		this.root2 = Math.sqrt( 2.0 ) / 2;
		console.log("PLAYER!");
	},
	
	/** Draws player at current Position
	 *
	 * @param ctx : canvas context for drawing 
	 */
	draw: function( ctx ) {
		ctx.fillStyle = "#222";
		ctx.fillRect(this.x - this.size/2, this.y - this.size * 2, this.size * (.1 + this.y/240), 2 * this.size * (.1 + this.y/240));
	},
	
	/** Handles moving the player
	 *
	 */
	moveSprite: function()  {
	
		if(this.moving) {
			var distSq = ( this.target.x - this.x ) * ( this.target.x - this.x ) +
						( this.target.y - this.y ) * ( this.target.y - this.y );
						
			if( distSq > 25 ) 
				this.moveToTarget();
			else
				this.moving = false;
		}
	},
	/** Handles moving the player
	 *
	 * @param x : x position of new target location
	 * @param y : y position of new target location
	 */
	setTarget: function( x, y ) {
		this.target.x = x;
		this.target.y = y;
		this.moving = true;
	},
	
	moveToTarget: function() {
		var dVec = { x: this.target.x - this.x, y: this.target.y - this.y };
		var mag = Math.sqrt( dVec.x * dVec.x + dVec.y * dVec.y );
		dVec.x = dVec.x/mag;
		dVec.y = dVec.y/mag;
		
		this.x += dVec.x;
		this.y += dVec.y;
	},
	
	inRange: function( x, y ) {
		var distSq = ( x - this.x ) * ( x - this.x ) +
						( y - this.y ) * ( y - this.y );
		return ( distSq < 1000 );
	}
	
 };