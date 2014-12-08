/* Main file for game
 * Basically the main controller class
 */
 "use strict";
 
 //If there isn't a game object add one
 var game = game || {};
 
 game.SadSpace = {
	// Constants
	WIDTH: 640,
	HEIGHT: 480,
	dt: 1/60.0,
	// Other Properties
	game: undefined,
	player: undefined,
	map: undefined,
	gameState: "gameScreen", // Game, LoseScreen
	selectedObject: undefined, // If the player clicks, what are they clicking ON?
	
	canvas: undefined,
	ctx: undefined,
	drawLib: undefined,
	utils: undefined,
	spriteImage: undefined,
	soundtrack: undefined,
	rightBoundry: 640,
	leftBoundry: 0,
	topBoundry: 240,
	bottomBoundry: 480,
	environmentObjs: [],
	inventoryObjs: [],
	mouse: { x: 0, y: 0 },
	
	// methods
	/** Sets up that main game, including the canvas and all of the menus
	 *
	 */
	init: function( ) {
		console.log("GAME!");
		// declaring properties
		this.canvas = document.querySelector( 'canvas' );
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext( '2d' );
		
		this.player = this.game.player;
		this.map = this.game.map;
		
		var testInvObject = new game.InventoryObject(350, 250, "test invobj", "no graphics rn", "test location", true);
		this.inventoryObjs.push(testInvObject);
		
		var testEnviroObject = new game.EnvironmentObject(250, 250, "test enobj", "no graphics rn", "test location", testInvObject);
		this.environmentObjs.push(testEnviroObject);
		
		var testControlPanel = new game.ControlPanel(450, 250, "test CP", "no graphics rn", "test location");
		this.environmentObjs.push(testControlPanel);

		//Set up mouse click - move this when items are added(?)
		var self = this;
		this.canvas.addEventListener("mouseup", function(e) 
		{
			var mouse = self.getMouse(e);
			if( self.checkWalkPos( mouse.x, mouse.y ) )
				self.player.setTarget(mouse.x, mouse.y);
			
			// if an object is selected, call its click function
			// Environment object - later, need to set up code to determine if it's being clicked
			// with an object in hand
			if(self.selectedObject && self.selectedObject instanceof game.EnvironmentObject)
			{
				// later we'll need either a for loop, or a player variable that references a held item
				// for now we only have one inventory object, so...
				if(self.inventoryObjs[0].isHeld) self.selectedObject.click(self.inventoryObjs[0], self.player);
				else self.selectedObject.click(self.player);
				// reset selectedObject
				self.selectedObject = undefined;
			}
			// Inventory object
			if(self.selectedObject && self.selectedObject instanceof game.InventoryObject)
			{
				self.selectedObject.click(self.player, self.WIDTH / 6, 7 * self.HEIGHT / 8);
				// reset selectedObject
				self.selectedObject = undefined;
			}
			// Control Panel object
			if(self.selectedObject && self.selectedObject instanceof game.ControlPanel)
			{
				self.selectedObject.click();
				// reset selectedObject
				self.selectedObject = undefined;
			}
			
			if(self.map.checkExits( mouse, self.player) ){
				var newBounds = self.map.rooms[self.map.currentRoom].bounds;
				self.rightBoundry = newBounds.right;
				self.leftBoundry = newBounds.left;
				self.topBoundry = newBounds.top;
				self.bottomBoundry = newBounds.bottom;
			}
		});
		
		this.canvas.addEventListener("mousemove", function(e) 
		{
			self.mouse = self.getMouse(e);
			
			// if an item is being held, adjust its position accordingly
			if(self.selectedObject && self.selectedObject instanceof game.InventoryObject)
			{
				self.selectedObject.draw("test location", self.mouse.x, self.mouse.y, self.ctx);
			}
		});
		
		this.update();
	},
	/** Method that gets called each frame by the browser
	 *
	 */
	update: function() {
	//console.log('u');
		switch( this.gameState ) {
			case "menuScreen" : 
				requestAnimationFrame( this.update.bind( this ) );
				break;
			
			case "gameScreen" :
				
				requestAnimationFrame( this.update.bind( this ) );
				
				this.moveSprites();
				
				this.drawSprites();
				
				break;
				
			case "loseScreen" :
				requestAnimationFrame( this.update.bind( this ) );
				break;
		}
	},
	/** All draw methods are called from here
	 *
	 */
	drawSprites: function() {
		//Background?
		this.ctx.fillStyle = "#eee";
		this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		this.ctx.fillStyle = "#888";
		this.ctx.fillRect(0,this.HEIGHT/2, this.WIDTH, this.HEIGHT/2);
		
		this.map.draw( this.ctx, this.mouse, this.player );
		
		
		// Inventory
		this.ctx.save();
		this.ctx.fillStyle = "#555";
		this.ctx.globalAlpha = 0.5;
		this.ctx.fillRect(0, 3 * this.HEIGHT/4, this.WIDTH, this.HEIGHT/4);
		this.ctx.restore();
		
		// Interactable objects
		var objectIsSelected; // used for determining which object is actually selected
		for(var i = 0; i < this.inventoryObjs.length; i++)
			{objectIsSelected = this.drawInteractionCircle(this.inventoryObjs[i], false);}
		// Resolve environment objects SECOND so they can be selected while holding something
		// (unless a better way comes up)
		for(var i = 0; i < this.environmentObjs.length; i++)
			{objectIsSelected = this.drawInteractionCircle(this.environmentObjs[i], objectIsSelected);}
		
		// if objectIsSelected is still false, selectedObject is therefore null!
		if(!objectIsSelected) this.selectedObject = undefined;
	},
	/** Handles moving for all moveable objs in the game
	 *
	 */
	moveSprites: function() {
		this.player.moveSprite();
	},
	/** Set up handlers for menu click events
	 *
	 */
	setUpMenus: function() {
	
	},
	/** Reset all values unique to each game session
	 *
	 */
	restartGame: function() {
	
	},
	//Sort function for sorting arrays numerically
	sortNum: function( a, b ) {
		return b - a;
	},
	
	getMouse: function (e){
			var mouse = {}
			mouse.x = e.pageX - e.target.offsetLeft;
			mouse.y = e.pageY - e.target.offsetTop;
			return mouse;
	},
	
	checkWalkPos: function( x, y ) {
		if( x < this.leftBoundry ) 
			return false;
		if( x > this.rightBoundry ) 
			return false;
		if( y < this.topBoundry ) 
			return false;
		if( y > this.bottomBoundry ) 
			return false;
		else
			return true;
	},
	
	drawInteractionCircle: function( obj, somethingSelected ) {
		var distSq = ( obj.x - this.mouse.x ) * ( obj.x - this.mouse.x ) + ( obj.y - this.mouse.y ) * ( obj.y - this.mouse.y );
		var objectIsSelected = somethingSelected; // used to update selection code
		if(obj instanceof game.ControlPanel)
		{
			objectIsSelected = false;
			obj.draw(this.ctx, this.WIDTH, this.HEIGHT);
		}
		var colr = "#00b";
		if(obj instanceof game.InventoryObject) 
			colr = "#0bb";
		else if(obj instanceof game.ControlPanel) 
			colr = "#0b0";

		this.ctx.fillStyle = colr;
		
		if( distSq < 400 ) 
		{
			this.ctx.beginPath();
			this.ctx.arc( obj.x, obj.y, 20, 0, 2*Math.PI );
			this.ctx.fill();
			this.ctx.closePath();
			
			this.selectedObject = obj; // object will be referenced on click
			objectIsSelected = true;
		}
		
		this.ctx.strokeStyle = colr;
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.arc( obj.x, obj.y, 20, 0, 2*Math.PI );
		this.ctx.stroke();
		this.ctx.closePath();
		
		return objectIsSelected;
	}
 };