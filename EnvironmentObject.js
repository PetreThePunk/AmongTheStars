"use strict";
var game = game || {};

game.EnvironmentObject = function() {

		// Constructors - one with a related inventory item, one without
		function EnvironmentObject(setX, setY, setName, setGraphic, setLocation, clicksToSolve)
		{
			this.name = setName;
			this.graphicSrc = setGraphic;
			this.graphicSrcIndex = 0;
			
			this.location = setLocation;
			this.x = setX; this.y = setY;
			
			this.solveThreshold = clicksToSolve;
			this.currentSolveClicks = 0;
			this.solved = false;
			
		};
		
		function EnvironmentObject(setX, setY, setName, setGraphic, setLocation, setObjectSolution)
		{
			this.name = setName;
			this.graphicSrc = setGraphic;
			this.graphicSrcIndex = 0;
			
			this.location = setLocation;
			this.x = setX; this.y = setY;
			
			this.relatedInvItem = setObjectSolution;
			
			this.solved = false;
		}

		var p = EnvironmentObject.prototype;
		
		/* Draws the item to the screen - only happens if it's in the player
		is in the room where it's currently located. However, I feel it would
		be best - since none of these can be held onto by the player - to determine
		in the MAIN method whether to draw them, rather than making it part of this
		function. Probably for loop, checking this location against player location. */
		p.draw = function(ctx)
		{ ctx.drawImage(this.graphicSrc[graphicSrcIndex], this.posX, this.posY); };

		// Clicked WHILE THE PLAYER IS NOT HOLDING AN ITEM
		p.click = function(player)
		{
			console.log("No code to handle environment object clicking yet");
			/* // The object has already been "solved"
			if(this.solved)
			{
				// display or play an "I don't need to do that" message
			}
			// An inventory item IS necessary to use this object
			else if(this.relatedInvItem)
			{
				// display or play an "I can't use this" message
			}
			// An inventory item IS NOT necessary to use this object
			else
			{
				// USE ANIMATION FOR PLAYER OBJECT?
				
				// Change this object's graphic accordingly
				this.graphicSrcIndex += 1;
				if(this.graphicSrcIndex == this.maxSrcIndex)
				{
					if(this.loopGraphics) {this.graphicSrcIndex = 0;}
					else {this.graphicSrcIndex -= 1;}
				}
				
				// Increase currentSolveClicks, solving the object if the threshold is reached
				this.currentSolveClicks += 1;
				if(this.currentSolveClicks >= this.solveThreshold)
				{
					this.solved = true;
					// That should cover it, but if other code necessary, it can go here
				}
			} */
		};

		/* Clicked WHILE THE PLAYER IS HOLDING AN ITEM - check if it's the right one, and
		proceed accordingly */
		p.click = function(heldObject, player)
		{
			console.log("No code to handle environment object clicking yet");
			
			// The object has already been "solved"
			if(this.solved)
			{
				// display or play an "I don't need to do that" message
			}
			// The player is using the correct inventory item on this object
			else if(this.relatedInvItem == heldObject)
			{
				console.log("Aha!");
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
		
		return EnvironmentObject;
}();