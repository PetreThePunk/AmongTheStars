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
	speed: 1,
	sizeX: 75,
	sizeY: 125,
	root2: 0.0,
	image: undefined,
	walkFrame: 0,
	walkFrameArray: [],
	frameCount: 0,
	//Initialize function for the start of the game
	init: function() {
		this.root2 = Math.sqrt( 2.0 ) / 2;
		console.log("PLAYER!");
		this.image = new Image();
		this.image.src = game.IMAGES["playerSprites"];
		this.walkFrameArray[0] = { x: 450, y: 0 };
		this.walkFrameArray[1] = { x: 600, y: 0 };
		this.walkFrameArray[2] = { x: 0, y: 250 };
		this.walkFrameArray[3] = { x: 150, y: 250 };
		this.walkFrameArray[4] = { x: 300, y: 250 };
		this.walkFrameArray[5] = { x: 450, y: 250 };
		this.walkFrameArray[6] = { x: 150, y: 0 };
		this.walkFrameArray[7] = { x: 300, y: 0 };
	},
	
	/** Draws player at current Position
	 *
	 * @param ctx : canvas context for drawing 
	 */
	draw: function( ctx ) {
		//ctx.fillStyle = "#222";
		//ctx.fillRect(this.x - this.size/2, this.y - this.size * 2, this.size * (.1 + this.y/240), 2 * this.size * (.1 + this.y/240));
		//ctx.drawImage(src, srcX, srcY, srcWidth, srcHeight, DestinationX, DestinationY, FrameW, FrameH)
		//ctx.drawImage(src, srcX, srcY, srcWidth, srcHeight, 
			//DestinationX, DestinationY, FrameW, FrameH)
		
		if(this.moving) {
			
			var frameW = this.sizeX * (.1 + this.y/240);
			var frameH = this.sizeY * (.1 + this.y/240);
			ctx.drawImage(this.image, this.walkFrameArray[this.walkFrame].x, this.walkFrameArray[this.walkFrame].y, 150, 250, 
				this.x - frameW/2, this.y - frameH, frameW, frameH);
			if(this.frameCount > 6 ){
				this.walkFrame++;
				this.frameCount = 0;
			} else {
				this.frameCount++;
			}
			
			
			if(this.walkFrame > 7)
				this.walkFrame = 0;
		} else {
			var frameW = this.sizeX * (.1 + this.y/240);
			var frameH = this.sizeY * (.1 + this.y/240);
			ctx.drawImage(this.image, 0, 0, 150, 250, 
				this.x - frameW/2, this.y - frameH, frameW, frameH);
			this.walkFrame = 0;
		}
		
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
		
		this.x += dVec.x*this.speed;
		this.y += dVec.y*this.speed;
	},
	
	inRange: function( x, y ) {
		var distSq = ( x - this.x ) * ( x - this.x ) +
						( y - this.y ) * ( y - this.y );
		return distSq < 1000 ;
	}
	
 };