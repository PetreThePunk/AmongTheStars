"use strict";
var game = game || {};

game.EnvironmentObject = function() {

		// Constructors - one with a related inventory item, one without
		function EnvironmentObject(setX, setY, setName, setGraphic, setLocation,
			setAssociatedObject, setIsPuzzle)
		{
			this.name = setName;
			if(setGraphic !== "none") {
				this.graphicSrc = new Image();
				this.graphicSrc.src = game.IMAGES[setGraphic];
			} else {
				this.graphicSrc = setGraphic;
			}
			
			this.location = setLocation;
			this.x = setX; this.y = setY;
			
			this.relatedInvItem = setAssociatedObject;
			this.solved = false;
			
			this.isPuzzle = setIsPuzzle;
		};
		
		var p = EnvironmentObject.prototype;
		
		/* Draws the item to the screen - only happens if it's in the player
		is in the room where it's currently located. However, I feel it would
		be best - since none of these can be held onto by the player - to determine
		in the MAIN method whether to draw them, rather than making it part of this
		function. Probably for loop, checking this location against player location. */
		p.draw = function(ctx)
		{
			if(this.graphicSrc !== "none") {
				ctx.drawImage(this.graphicSrc, this.x-this.graphicSrc.width/4, this.y-this.graphicSrc.height/4, this.graphicSrc.width/2, this.graphicSrc.height/2);
			}
		};

		/* Clicked by player - check if item is needed and if player has right one */
		p.click = function(heldObject, player)
		{
			// The object has already been "solved"
			if(this.solved)
			{
				// display or play an "I don't need to do that" message
				game.SadSpace.textToDraw="I'm done here.";
				game.SadSpace.textDisplayTime=50;
			}
			// Object is a container or somesuch rather than an inventory puzzle
			else if(this.isPuzzle == false)
			{
				// add an item to the player's inventory
				if(this.relatedInvItem != "none")
				{
					game.SadSpace.inventoryObjs.push(this.relatedInvItem);
					// now the thing is empty!
					this.solved = true;
				}
				else if(this.name = "Central Computer")
				{
					console.log("beep boop I am computer");
					game.SadSpace.textToDraw=game.SadSpace.computer[game.SadSpace.computerClicks];
					game.SadSpace.textDisplayTime=200;
					game.SadSpace.computerClicks++;
					if(game.SadSpace.computerClicks>=game.SadSpace.computer.length)
						game.SadSpace.computerClicks=0;
				}
				else{
					// now the thing is empty!
					this.solved = true;
				}
			}
			// An item is needed AND The player is using the correct inventory item on this object
			else if(this.relatedInvItem != false && this.relatedInvItem == heldObject)
			{
				console.log("Solved by item");
				// USE ANIMATION FOR PLAYER OBJECT?
				// Solve this object
				this.solved = true;
				// If the inventory item is one-use, delete it
				if(heldObject.destroyOnUse) heldObject.deleteMe();
			}
			// The player is NOT using the correct inventory item on this object
			else
			{
				// display or play an "I can't use this" or "examine" message
			}
		};

		// Deletes this object (when a consumable is successfully used)
		// NEEDS TO BE SPLICED FROM THE ASSOCIATED ARRAY
		p.deleteMe = function()
		{ 
			// remove it from the array
			var arrayLoc = game.SadSpace.environmentObjs.indexOf(this);
			game.SadSpace.environmentObjs.splice(arrayLoc, 1);
			// delete the object itself
			delete this; 
		};
		
		return EnvironmentObject;
}();