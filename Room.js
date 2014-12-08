"use strict";
var game = game || {};

game.Room = function() {
		console.log('h');
		// Constructor
		function Room( setName, setGraphic, bounds, exits )
		{
			this.name = setName;
			this.graphicSrc = setGraphic;
			this.bounds = bounds;
			this.exits = exits;
		}

		var p = Room.prototype;
		
		p.draw = function(ctx)
		{
			//ctx.drawImage(this.graphicSrc, this.posX, this.posY);
			
		};
		
		return Room;
}();