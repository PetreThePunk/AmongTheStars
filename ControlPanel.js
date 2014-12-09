"use strict";
var game = game || {};

game.ControlPanel = function() {

		// Constructor
		function ControlPanel(setX, setY, setName, setGraphic, initialRoom)
		{
			this.name = setName;
			this.location = initialRoom;
			this.graphicSrc = setGraphic;
			this.x = setX; this.y = setY;
			this.code = ["_","_","_","_"];
			this.selected = false;
		};

		var p = ControlPanel.prototype;
		
		p.draw = function(ctx, width, height)
		{
			// ctx.drawImage(this.graphicSrc, this.x, this.y);
			//on center of screen draw black rectangle with 4 characters from code if selected
			if(this.selected)
			{
				console.log (this.code);
				ctx.font="50px Courier";
				ctx.fillStyle="green";
				ctx.textAlign="center";
				ctx.fillText(this.code[0]+""+this.code[1]+""+this.code[2]+""+this.code[3],width/2,height/2);
			}
		};
		
		p.click = function()
		{
			//on click, bring up control panel window if not selected, close if selected
			if(!this.selected)
				this.selected = true;
			else 
				this.selected = false;
		};
		
		//returns true if legal, false if not
		p.changeCode = function(i, val)
		{
			//see if val is a number
			if(val==0 || val==1 || val==2 || val==3 || val==4 || val==5 || val==6 || val==7 || val==8 || val==9)
			{
				//see if adding new code or checking against old code
				if(this.code[i] == "_")
				{
					this.code[i] = val;
					return true;
				}
				else 
					if(this.code[i] == val)
						return true;
			}
			return false;
		};

		return ControlPanel;
}();