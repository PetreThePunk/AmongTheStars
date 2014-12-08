"use strict";
var game = game || {};

game.InventoryObject = function() {
	
		
		// Constructor
		function InventoryObject(setX, setY, setName, setGraphic, initialRoom)
		{
			this.name = setName;
			this.graphicSrc = setGraphic;

			this.location = initialRoom;
			this.x = setX; this.y = setY;
			this.isHeld = false; // defaults to outside of inventory
		};

		var p = InventoryObject.prototype;
		
		/* Draws the item to the screen - only happens if it's in the player's
		inventory OR if the player is in the room where it's currently located 

		IF NECESSARY, MODIFY THIS TO ACCEPT HEIGHT AND WIDTH PARAMETERS! However,
		this should generally work with "automatic" dimensions of the source
		graphic. */
		p.draw = function(playerLocation, mouseX, mouseY, ctx)
		{
			// if held by the player, move it along with the mouse
			if(this.isHeld)
			{
				this.x = mouseX; this.y = mouseY;
				console.log("is hold"); 
			}
			
			if(this.inInventory || location == playerLocation)
			{
				console.log("hey");
				// ctx.drawImage(this.graphicSrc, this.posX, this.posY);
			}
		};

		/* When clicked (collision check should be done in main, imo), see if
		the item is in the inventory or not: if not, pick it up, and if so,
		select it. 
		
		Might want to define inventorySlot position internally, but for now,
		just testing */
		p.click = function(player, inventorySlotX, inventorySlotY)
		{
			if(this.inInventory == false)
			{
				// PICKUP ANIMATION FOR PLAYER OBJECT?
				
				this.inInventory = true;
				this.x = inventorySlotX; this.y = inventorySlotY;
				
				// POSSIBLE GRAPHICAL CHANGE to a larger, more detailed version?
			}
			// switch between holding/not holding it
			else if(this.isHeld)
			{
				this.isHeld = false;
				this.x = inventorySlotX; this.y = inventorySlotY; // return it to the inventory
			}
			else{this.isHeld = true;}
		};
		
		return InventoryObject;
}();