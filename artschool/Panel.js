var Panel = Container.extend({
	
	/*removeComponentAtIndex: function(component) {
		this._super(component);
		
		this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
	},
	
	removeComponent: function(component) {
		this._super(component);
		
		this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
	},*/
	
	getTiling: function() {
		return this.tiling;
	},
	
	setTiling: function(tiling) {
		this.tiling = tiling;
	},
	
	getTotalFlex: function() {
		var totalFlex = 0;
		var components = this.getComponents();
		for(var i = 0; i < components.length; i++) {
			var c = components[i];
			var a = c.getArrangement();
			
			if((this.vertical && a.height < 0) || (!this.vertical && a.width < 0)) {
				totalFlex += a.flex;
			}
		}
		
		return totalFlex;
	},
	
	getTotalFlexRoom: function() {
		var room = this.vertical ? this.getHeight() : this.getWidth();
		var components = this.getComponents();
		for(var i = 0; i < components.length; i++) {
			var c = components[i];
			var a = c.getArrangement();
			
			if(this.vertical) {
				if(a.height > 0) {
					room -= a.height;
				}
			}
			else {
				if(a.width > 0) {
					room -= a.width;
				}
			}
		}
		
		return room;
	},
	
	positionVerticalFlex: function() {
		var totalFlex = this.getTotalFlex();
		var totalFlexRoom = this.getTotalFlexRoom();
		var currentY = 0;
		
		var components = this.getComponents();
		for(var i = 0; i < components.length; i++) {
			var c = components[i];
			var a = c.getArrangement();
			
			if(a.height < 0) {
				var newHeight = (a.flex / totalFlex) * totalFlexRoom;
				if(a.minHeight > 0 && newHeight < a.minHeight) {
					totalFlexRoom -= a.minHeight;
					totalFlex -= a.flex;
				}
				else if(a.maxHeight > 0 && newHeight > a.maxHeight) {
					totalFlexRoom -= a.maxHeight;
					totalFlex -= a.flex;
				}
			}
		}
		
		for (var i = 0; i < components.length; i++) {
			var c = components[i];
			var a = c.getArrangement();
			
			if (a.height < 0) {
				var newHeight = (a.flex / totalFlex) * totalFlexRoom;
				if (a.minHeight > 0 && newHeight < a.minHeight) {
					newHeight = a.minHeight;
				}
				else if(a.maxHeight > 0 && newHeight > a.maxHeight) {
					newHeight = a.maxHeight;
				}
				
				c.setY(currentY);
				c.setWidth(this.getWidth()); //TODO: if stretch
				c.setHeight(newHeight);
				
				currentY += newHeight; //TODO: border, margin?
			}
			else {
				c.setY(currentY);
				c.setWidth(this.getWidth());
				c.setHeight(a.height);
				
				currentY += a.height;
			}
		}
	},
	
	positionHorizontalFlex: function() {
		var totalFlex = this.getTotalFlex();
		var totalFlexRoom = this.getTotalFlexRoom();
		var currentX = 0;
		
		var components = this.getComponents();
		for(var i = 0; i < components.length; i++) {
			var c = components[i];
			var a = c.getArrangement();
			
			if(a.width < 0) {
				var newWidth = (a.flex / totalFlex) * totalFlexRoom;
				if(a.minWidth > 0 && newWidth < a.minWidth) {
					totalFlexRoom -= a.minWidth;
					totalFlex -= a.flex;
				}
				else if(a.maxWidth > 0 && newWidth > a.maxWidth) {
					totalFlexRoom -= a.maxWidth;
					totalFlex -= a.flex;
				}
			}
		}
		
		for (var i = 0; i < components.length; i++) {
			var c = components[i];
			var a = c.getArrangement();
			
			if (a.width < 0) {
				var newWidth = (a.flex / totalFlex) * totalFlexRoom;
				if (a.minWidth > 0 && newWidth < a.minWidth) {
					newWidth = a.minWidth;
				}
				else if(a.maxWidth > 0 && newWidth > a.maxWidth) {
					newWidth = a.maxWidth;
				}
				
				c.setX(currentX);
				c.setHeight(this.getHeight()); //TODO: if stretch
				c.setWidth(newWidth);
				console.log('ccc ' + c.toString());
				console.log(c);
				
				currentX += newWidth; //TODO: border, margin?
			}
			else {
				c.setX(currentX);
				c.setHeight(this.getHeight());
				c.setWidth(a.width);
				
				currentX += a.width;
			}
		}
		
		console.log(components);
	},
	
	positionVertical: function() {
		var tiling = this.getTiling();
	
		var translation = {x: 0, y: 0};
	
		if(tiling.justify == 'left') {
			translation.x += tiling.margin;
		}
		else if(tiling.justify == 'right') {
			translation.x += this.getWidth() - tiling.margin;
		}
		
		var setWidth = -1;
		if(tiling.stretch == 'max') {
			var components = this.getComponents();
			for(var i = 0; i < components.length; i++) {
				var c = components[i];
				if(c.getWidth() > setWidth) {
					setWidth = c.getWidth();
				}
			}
		}
		else if(tiling.stretch == 'full') {
			setWidth = this.getWidth() - 2 * tiling.margin;
		}
		
		var components = this.getComponents();
		for(var i = 0; i < components.length; i++) {
			var c = this.components[i];
			
			translation.y += tiling.spacing;
			if(tiling.justify == 'right') {
				c.setX(translation.x - c.getWidth());
			}
			else {
				c.setX(translation.x);
			}
			c.setY(translation.y);
			
			if(setWidth > 0) {
				//c.stretchTo(setWidth, object.getHeight());
				c.setWidth(setWidth);
			}
			
			translation.y += c.getHeight();
		}
		
		//TODO: yeah?
		//this.setHeight(translation.y + tiling.margin);
	},
	
	positionHorizontal: function() {
		var tiling = this.getTiling();
	
		var translation = {x: 0, y: 0};
	
		if(tiling.justify == 'top') {
			translation.y += tiling.margin;
		}
		else if(tiling.justify == 'bottom') {
			translation.y += this.getHeight() - tiling.margin;
		}
		
		var setHeight = -1;
		if(tiling.stretch == 'max') {
			var components = this.getComponents();
			for(var i = 0; i < components.length; i++) {
				var c = components[i];
				if(c.getHeight() > setHeight) {
					setHeight = c.getHeight();
				}
			}
		}
		else if(tiling.stretch == 'full') {
			setHeight = this.getHeight() - 2 * tiling.margin;
		}
		
		var components = this.getComponents();
		for(var i = 0; i < components.length; i++) {
			var c = this.components[i];
			
			translation.x += tiling.spacing;
			if(tiling.justify == 'bottom') {
				c.setY(translation.y - c.getHeight());
			}
			else {
				c.setY(translation.y);
			}
			c.setX(translation.x);
			
			if(setHeight > 0) {
				//c.stretchTo(object.getWidth(), setHeight);
				c.setHeight(setHeight);
			}
			
			translation.x += c.getWidth();
		}
		
		// TODO: yeah?
		//this.setWidth(translation.x + tiling.margin);
	},
	
	draw: function() {
		var fill = this.getTiling().fill;
		var tiling = this.getTiling().tiling;
		
		if(fill == 'flex') {
			if(tiling == 'vertical') {
				this.positionVerticalFlex();
			}
			else if(tiling == 'horizontal') {
				this.positionHorizontalFlex();
			}
			else {
				console.error('Tiling flex only makes sense with horizontal or vertical');
			}
		}
		else {
			if(tiling == 'vertical') {
				this.positionVertical();
			}
			else if(tiling == 'horizontal') {
				this.positionHorizontal();
			}
			else {
				console.error('only doing horizontal and vertical');
			}
		}
		
		//console.log(this.getComponents());
		
		this.makeNewContext();
		var image = this._super();
		
		var context = this.getContext();
		
		return context.getImageData(0, 0, this.getWidth(), this.getHeight());
	},
	
	// init
	init: function(config) {
		this._super(config);
		
		this.tiling = new Tiling(config && config.tiling || null);
		
		this.vertical = false;
		if(this.tiling.tiling == 'vertical') {
			this.vertical = true;
		}
		
		this.setType('panel' + (this.tiling.tiling));
	}
});