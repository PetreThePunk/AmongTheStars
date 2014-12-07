"use strict";
var game = game || {};

game.EnvironmentObject = function() {

	/**
		THIS IS POINTLESS
		
		
		// Declare variables
		var name;
		var location;
		var posX; var posY;

		var relatedInvItem;     // An item to use on this object to "solve" it, when applicable
		var solved;   			// A "solved" object no longer needs to be interacted with
		var solveThreshold;     // For objects "solved" purely by clicking, activated when clicked this many times.
		var currentSolveClicks; // This is only here as an edge case - clicking on a cabinet to open it + then again
								// to take things out of it, for instance - and can be removed if irrelevant

		var graphicSrc; // NOTE: This should be an ARRAY! Explained below.
		var graphicSrcIndex;
		var maxSrcIndex; var loopGraphics; // when to stop changing the sprite or go back to the original one


	*/
		// Constructors - one with a related inventory item, one without
		function EnvironmentObject(setName, setGraphics, setLocation, clicksToSolve)
		{
			
			
			this.name = setName;
			this.graphicSrc = setGraphic;
			this.graphicSrcIndex = 0;
			this.location = setLocation;
			
			this.solveThreshold = clicksToSolve;
			this.currentSolveClicks = 0;
			this.solved = false;
		}
		/*
		function EnvironmentObject(setName, setGraphics, setLocation, setObjectSolution)
		{
			this.name = setName;
			this.graphicSrc = setGraphic;
			this.graphicSrcIndex = 0;
			this.location = setLocation;
			this.relatedInvItem = setObjectSolution;
			
			this.solved = false;
		}
		*/

		var p = EnvironmentObject.prototype;
		
		/* Draws the item to the screen - only happens if it's in the player
		is in the room where it's currently located. However, I feel it would
		be best - since none of these can be held onto by the player - to determine
		in the MAIN method whether to draw them, rather than making it part of this
		function. Probably for loop, checking this location against player location. */
		p.draw = function(ctx)
		{ ctx.drawImage(this.graphicSrc[graphicSrcIndex], this.posX, this.posY); }

		// Clicked WHILE THE PLAYER IS NOT HOLDING AN ITEM
		p.click = function(player)
		{
			// The object has already been "solved"
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
			}
		}

		/* Clicked WHILE THE PLAYER IS HOLDING AN ITEM - check if it's the right one, and
		proceed accordingly */
		p.click = function(heldObject, player)
		{
			// The object has already been "solved"
			if(this.solved)
			{
				// display or play an "I don't need to do that" message
			}
			// The player is using the correct inventory item on this object
			else if(this.relatedInvItem == heldObject)
			{
				// USE ANIMATION FOR PLAYER OBJECT?
				this.solved = true;
				// Again, should cover it, but other code might be necessary
			}
			// The player is NOT using the correct inventory item on this object
			else
			{
				// display or play an "I can't use this" or "examine" message
			}
		}
}