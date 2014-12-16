"use strict";
var game = game || {};

game.InventoryObject = function() {
	
		
		// Constructor
		function InventoryObject(setX, setY, setName, setGraphic, initialRoom, isoneuse, idNumber)
		{
			this.name = setName;
			if(setGraphic !== "none") {
				this.graphicSrc = new Image();
				this.graphicSrc.src = game.IMAGES[setGraphic];
			} else {
				this.graphicSrc = setGraphic;
			}
			
			this.id = idNumber;
			this.location = initialRoom;
			this.x = setX; this.y = setY;
			this.isHeld = false; // defaults to outside of inventory
			this.inInventory = false; 
			
			this.destroyOnUse = isoneuse;
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
			}
			
			//if(this.inInventory || location == playerLocation)
			//{
				if(this.graphicSrc !== "none") {
					ctx.drawImage(this.graphicSrc, this.x-this.graphicSrc.width/4, this.y-this.graphicSrc.height/4, this.graphicSrc.width/2, this.graphicSrc.height/2);
				}
			//}
		};

		/* When clicked (collision check should be done in main, imo), see if
		the item is in the inventory or not: if not, pick it up, and if so,
		select it. */
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
		
		// Deletes this object (when a consumable is successfully used)
		// NEEDS TO BE SPLICED FROM THE ASSOCIATED ARRAY
		p.deleteMe = function()
		{ 
			// remove it from the array
			var arrayLoc = game.SadSpace.inventoryObjs.indexOf(this);
			game.SadSpace.inventoryObjs.splice(arrayLoc, 1);
			// delete the object itself
			delete this; 
		};
		
		return InventoryObject;
}();