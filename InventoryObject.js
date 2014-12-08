"use strict";
var game = game || {};

game.InventoryObject = function() {
		// Declare variables
		/*
		var name;
		var inInventory; var isActive;
		var location;       // where the item is originally found
		var posX; var posY; // where the item is displayed on the screen
							
		var graphicSrc;
		*/
		
		// Constructor
		function InventoryObject(setName, setGraphic, initialRoom)
		{
			this.name = setName;
			this.graphicSrc = setGraphic;
			this.location = initialRoom;
			this.isHeld = false; // defaults to outside of inventory
		}

		/* Draws the item to the screen - only happens if it's in the player's
		inventory OR if the player is in the room where it's currently located 

		IF NECESSARY, MODIFY THIS TO ACCEPT HEIGHT AND WIDTH PARAMETERS! However,
		this should generally work with "automatic" dimensions of the source
		graphic. */
		p.draw = function(playerLocation, ctx)
		{
			if(this.inInventory || location == playerLocation)
			{
				ctx.drawImage(this.graphicSrc, this.posX, this.posY);
			}
		}

		/* When clicked (collision check should be done in main, imo), see if
		the item is in the inventory or not: if not, pick it up, and if so,
		select it. */
		p.click = function(player, inventorySlotX, inventorySlotY)
		{
			if(this.inInventory == false)
			{
				// PICKUP ANIMATION FOR PLAYER OBJECT?
				
				this.inInventory = true;
				this.posX = inventorySlotX; this.posY = inventorySlotY;
				
				// POSSIBLE GRAPHICAL CHANGE to a larger, more detailed version?
			}
			else
			{
				this.isActive = true;
			}
		}
}();
		// Function to move w/ mouse cursor? Can probably be handled all in the main.