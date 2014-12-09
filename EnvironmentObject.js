"use strict";
var game = game || {};

game.EnvironmentObject = function() {

		// Constructors - one with a related inventory item, one without
		function EnvironmentObject(setX, setY, setName, setGraphic, setLocation, clicksToSolve, setObjectSolution)
		{
			this.name = setName;
			this.graphicSrc = setGraphic;
			this.graphicSrcIndex = 0;
			
			this.location = setLocation;
			this.x = setX; this.y = setY;
			
			this.solveThreshold = clicksToSolve;
			this.relatedInvItem = setObjectSolution;
			this.currentSolveClicks = 0;
			this.solved = false;
			
		};
		
		var p = EnvironmentObject.prototype;
		
		/* Draws the item to the screen - only happens if it's in the player
		is in the room where it's currently located. However, I feel it would
		be best - since none of these can be held onto by the player - to determine
		in the MAIN method whether to draw them, rather than making it part of this
		function. Probably for loop, checking this location against player location. */
		p.draw = function(ctx)
		{ ctx.drawImage(this.graphicSrc[graphicSrcIndex], this.posX, this.posY); };

		/* Clicked by player - check if item is needed and if player has right one */
		p.click = function(heldObject, player)
		{
			// The object has already been "solved"
			if(this.solved)
			{
				// display or play an "I don't need to do that" message
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
			//An item is NOT needed and the player has clicked on it
			else if(!this.relatedInvItem)
			{
				this.currentSolveClicks++;
				//check clicks to solve vs current clicks
				if(this.currentSolveClicks<this.solveThreshold)
				{
					console.log("Need more clicks!");
					//more clicks are needed!
				}
				else
				{
					console.log("Solved by clicks!");
					//we have the right number of clicks!
					this.solved = true;
				}
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
			console.log("Delete");
			// remove it from the array
			var arrayLoc = game.SadSpace.environmentObjs.indexOf(this);
			console.log(arrayLoc);
			game.SadSpace.environmentObjs.splice(arrayLoc, 1);
			// delete the object itself
			delete this; 
		};
		
		return EnvironmentObject;
}();