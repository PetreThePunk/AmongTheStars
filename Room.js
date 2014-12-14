"use strict";
var game = game || {};

game.Room = function() {
		// Constructor
		function Room( setName, setGraphic, bounds, exits )
		{
			this.name = setName;
			this.graphicSrc = new Image();
			this.graphicSrc.src = game.IMAGES[setGraphic];
			this.bounds = bounds;
			this.exits = exits;
		}

		var p = Room.prototype;
		
		p.draw = function(ctx)
		{
			ctx.drawImage(this.graphicSrc,0,0, 640, 480);
		};
		
		return Room;
}();