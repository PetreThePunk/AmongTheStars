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
	theEnd: undefined,
	//use BREAK to create a new line manually, otherwise new lines are created automatically for ending text
	//Ending 0: Exit the space station with your space suit
	//Ending 1: Exit the space station withOUT your space suit
	//Ending 2: Fix ruptured pipeline and fill up fuel
	endings: ["As you exit the station the vastness of space is spread out before you. The Red Spot of Jupiter is clearly visible below you. BREAK While you're taking in the beauty of the void you get hit by stray debris. You find yourself floating in space all alone.","You forgot your space suit. BREAK You die in seconds.","The pressure created by sealing up the broken pipe created a small explosion. Normally this might not be an issue besides singeing your eyebrows and creating a small amount of damage that could easily be fixed. BREAK But of course you filled up a nearby fuel tank with fuel. This created a bigger explosion which may or may not have killed you. BREAK BREAK Spoiler alert: it did."],
	selectedObject: undefined, // If the player clicks, what are they clicking ON?
	mouseOnObj: false,
	canvas: undefined,
	ctx: undefined,
	drawLib: undefined,
	utils: undefined,
	spriteImage: undefined,
	soundtrack: undefined,
	rightBoundry: 640,
	leftBoundry: 0,
	topBoundry: 240,
	bottomBoundry: 360,
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
		
		this.theEnd = 0;
		
		// Reusable item - Trusty Wrench
		var wrench = new game.InventoryObject(40, 7 * this.HEIGHT / 8, "Your Trusty Wrench", "no graphics rn", 
			"Bedroom", false, 0);
		wrench.inInventory = true;
		this.inventoryObjs.push(wrench);
		
		// Speaking with your AI friend
		var centralComputer = new game.EnvironmentObject(310, 250, "Central Computer", "no graphics rn", 
			"Control Room", "none", false);
		this.environmentObjs.push(centralComputer);
		
		// Getting into the storage room + retrieving the fuel reserves + tape
		var unopenableDoor = new game.EnvironmentObject(630, 300, "Locked Door", "no graphics rn", 
			"Laboratory", "Red Herring", true);
		var helpfulVent = new game.EnvironmentObject(530, 250, "Vent Cover", "no graphics rn", 
			"Laboratory", wrench, true);
		this.environmentObjs.push(unopenableDoor);
		this.environmentObjs.push(helpfulVent);
		
		var fuelReserves = new game.InventoryObject(280, 320, "Fuel", "no graphics rn", 
			"Storage", true, 1);
		var ductTape = new game.InventoryObject(430, 290, "Duct Tape", "no graphics rn", 
			"Storage", true, 2);
		this.inventoryObjs.push(fuelReserves);
		this.inventoryObjs.push(ductTape);
		
		// Unlocking the airlock/engine room? door
		var airlockKey = new game.InventoryObject(400, 250, "Key", "no graphics rn", "Bedroom", true, 3);
		var spaceSuit = new game.InventoryObject(400, 250, "Space Suit", "no graphics rn", "Airlock", true, -2);
		this.inventoryObjs.push(spaceSuit);
		var bedroomCabniet = new game.EnvironmentObject(350, 250, "Cabinet", "no graphics rn", 
			"Bedroom", airlockKey, false);
		var doorToAirlock = new game.EnvironmentObject(10, 300, "Locked Door", "no graphics rn", 
			"Docking Bay", airlockKey, true);
		this.environmentObjs.push(doorToAirlock);
		this.environmentObjs.push(bedroomCabniet);
		
		// Fixing the engines - might need to revise this?
		var rupturedFuelPipe = new game.EnvironmentObject(140, 250, "Ruptured Pipeline", 
			"no graphics rn", "Airlock", ductTape, true);
		var emptyFuelTank = new game.EnvironmentObject(120, 250, "Fuel Tank (Empty)", 
			"no graphics rn", "Airlock", fuelReserves, true);
		var stuckValve = new game.EnvironmentObject(140, 275, "Stuck Valve", 
			"no graphics rn", "Airlock", wrench, true);
		this.environmentObjs.push(rupturedFuelPipe);
		this.environmentObjs.push(emptyFuelTank);
		this.environmentObjs.push(stuckValve);
		
		//var testControlPanel = new game.ControlPanel(450, 250, "test CP", "no graphics rn", "Doors");
		//this.environmentObjs.push(testControlPanel);

		//Set up mouse click - move this when items are added(?)
		var self = this;
		this.canvas.addEventListener("mouseup", function(e) 
		{
			var mouse = self.getMouse(e);
			if( self.checkWalkPos( mouse.x, mouse.y ) && (!self.mouseOnObj || (self.selectedObject && self.selectedObject instanceof game.InventoryObject)))
				self.player.setTarget(mouse.x, mouse.y);
			// if an object is selected, call its click function
			// Environment object - later, need to set up code to determine if it's being clicked
			// with an object in hand
			if(self.selectedObject && self.selectedObject instanceof game.EnvironmentObject)
			{
				var heldItem=-1;
				for(var i=0;i<self.inventoryObjs.length;i++)
					if(self.inventoryObjs[i].isHeld) heldItem = i;

				if(heldItem>=0) self.selectedObject.click(self.inventoryObjs[heldItem], self.player);
				else self.selectedObject.click(false, self.player);
				
				/* *** OBJECTS SOLVED ACTIONS *** */
				//when vent cover is opened, make door
				if(self.selectedObject.solved && self.selectedObject.name == "Vent Cover")
				{
					self.selectedObject.deleteMe();
					self.map.rooms[5].exits[1].x = 530;
				}
				//when airlock door is unlocked, make door
				else if(self.selectedObject.solved && self.selectedObject.name == "Locked Door")
				{
					self.selectedObject.deleteMe();
					self.map.rooms[0].exits[0].x = 10;
				}
				//when fuel tank is filled, change name
				else if(self.selectedObject.solved && self.selectedObject.name == "Fuel Tank (Empty)")
				{
					self.selectedObject.name = "Fuel Tank";
					for(var i = 0; i < self.environmentObjs.length; i++)
					{
						if(self.environmentObjs[i].name == "Pipeline w/ Duct Tape")
						{
							self.gameState = "loseScreen";
							self.theEnd = 2;
						}
					}
				}
				//when ruptured pipeline is taped, change name
				else if(self.selectedObject.solved && self.selectedObject.name == "Ruptured Pipeline")
				{
					self.selectedObject.name = "Pipeline w/ Duct Tape";
					for(var i = 0; i < self.environmentObjs.length; i++)
					{
						if(self.environmentObjs[i].name == "Fuel Tank")
						{
							self.gameState = "loseScreen";
							self.theEnd = 2;
						}
					}
				}
				// reset selectedObject
				self.selectedObject = undefined;
			}
			// Inventory object
			if(self.selectedObject && self.selectedObject instanceof game.InventoryObject)
			{
				// if the player is in range of the object OR it's in the player's inventory already
				if((self.player.inRange (self.selectedObject.x, self.selectedObject.y)) ||
					self.selectedObject.inInventory)
					self.selectedObject.click(self.player, 40 + 50 * self.selectedObject.id, 7 * self.HEIGHT / 8);
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
			
			//see if player is in space and check which ending they should receive
			if(self.map.currentRoom == 7)
			{
				//get spaceSuit
				var haveSuit = false;
				for(var i=0;i<self.inventoryObjs.length; i++)
				{
					if(self.inventoryObjs[i].name=="Space Suit" && self.inventoryObjs[i].inInventory)
					{
						haveSuit=true;
						break;
					}
				}
				//if player has suit in space have them drift off (ending 0)
				if(haveSuit)
				{
					self.gameState = "loseScreen";
					self.theEnd = 0;
				}
				//if player DOES NOT have suit in space have them die (ending 1)
				if(!haveSuit)
				{
					self.gameState = "loseScreen";
					self.theEnd = 1;
				}
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
				
				this.drawLoseScreen(this.theEnd);
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
		var objectIsSelected, objectsSelected=0; // used for determining which object is actually selected
		for(var i = 0; i < this.inventoryObjs.length; i++)
		{
			if(this.map.rooms[this.map.currentRoom].name == this.inventoryObjs[i].location || this.inventoryObjs[i].inInventory)
				objectIsSelected = this.drawInteractionCircle(this.inventoryObjs[i], false);
			if(objectIsSelected) 
				objectsSelected++;
		}
		// Resolve environment objects SECOND so they can be selected while holding something
		// (unless a better way comes up)
		for(var i = 0; i < this.environmentObjs.length; i++)
		{
			if(this.map.rooms[this.map.currentRoom].name == this.environmentObjs[i].location)
				objectIsSelected = this.drawInteractionCircle(this.environmentObjs[i], objectIsSelected);
			if(objectIsSelected) 
				objectsSelected++;
		}
		
		// if objectIsSelected is still false, selectedObject is therefore null!
		if(objectsSelected==0) 
			this.selectedObject = undefined;
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
		
		
		this.ctx.strokeStyle = colr;
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.arc( obj.x, obj.y, 20, 0, 2*Math.PI );
		this.ctx.stroke();
		this.ctx.closePath();
		
		if( distSq < 400 ) 
		{
			this.ctx.beginPath();
			this.ctx.arc( obj.x, obj.y, 20, 0, 2*Math.PI );
			this.ctx.fill();
			this.ctx.closePath();
			
			this.selectedObject = obj; // object will be referenced on click
			objectIsSelected = true;
			
			this.ctx.font = '10px Veranda';
			this.ctx.fillStyle = "#fff";
			this.ctx.fillText( obj.name, this.mouse.x, this.mouse.y );
		}
		
		this.mouseOnObj = objectIsSelected;
		return objectIsSelected;
	},
	
	drawLoseScreen: function(ending) {
		//background
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);

		//font
		this.ctx.font = '12px Courier';
		this.ctx.textAlign = 'center';
		this.ctx.fillStyle = "#0f0";
		
		//text wrap
		var words = this.endings[ending].split(' ');
        var line = '';
		var x=this.WIDTH/2, y = 12;
        for(var n = 0; n < words.length; n++) {
			if(words[n] == "BREAK"){
				this.ctx.fillText(line, x, y);
				line = '';
				y += 12;
			}
			else{
				var testLine = line + words[n] + ' ';
				var metrics = this.ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > this.WIDTH/1.5 && n > 0) {
					this.ctx.fillText(line, x, y);
					line = words[n] + ' ';
					y += 12;
				}
				else
					line = testLine;
			}
        }
        this.ctx.fillText(line, x, y);
	}
 };