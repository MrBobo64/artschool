/* ScrollingWindow extends Container */
// Needs object coordinating how to place items inside, right now, going vertically

ScrollingWindow = function(x, y, width, height, scrollHorizontal, scrollVertical) {
    this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.scrollX = 0;
	this.scrollY = 0;
	
	this.justify = 'left';
	this.margin = 10;
	this.spacing = 10;
	
	this.horizontalScrollbar = null;
	this.verticalScrollbar = null;
	
	if(scrollHorizontal) {
	    this.horizontalScrollbar = new Scrollbar(this, false);
		this.horizontalScrollbar.x = this.horizontalScrollbar.fatness + 2;
		this.horizontalScrollbar.y = this.height - this.horizontalScrollbar.fatness - 2;
	}
	if(scrollVertical) {
	    this.verticalScrollbar = new Scrollbar(this, true);
		this.verticalScrollbar.x = this.width - this.verticalScrollbar.fatness - 2;
		this.verticalScrollbar.y = this.verticalScrollbar.fatness;
	}
	
	this.isDraggable = false;
	this.dragObject = null;
};
ScrollingWindow.prototype = Proto.clone(Container.prototype);

ScrollingWindow.prototype.drawScrollbars = function(context) {
	if(this.horizontalScrollbar) {
	    this.horizontalScrollbar.draw(context);
	}
	if(this.verticalScrollbar) {
	    this.verticalScrollbar.draw(context);
	}
};

// Draw frame
//  - Draw a special color for highlight
//  - Frame provides clip for insides of this window
ScrollingWindow.prototype.drawFrame = function(context) {
	context.lineWidth = 1;
	if(this.highlighted) {
		context.strokeStyle = '#FFDD50';
	}
	else {
		context.strokeStyle = '#000000';
	}
    context.rect(0, 0, this.width, this.height);
    context.stroke();
    context.clip();
};

ScrollingWindow.prototype.draw = function(canvas) {
	if(this.visible) {
		var context = canvas.getContext();
	
		context.save();
		
		context.translate(this.x, this.y);
		
		this.drawScrollbars(context);
		this.drawFrame(context);

		var translation = {x: 0, y:0};
		translation.x = -this.scrollX;
		translation.y = -this.scrollY;
		
		if(this.justify == 'left') {
			translation.x += this.margin;
		}
		else if(this.justify == 'right') {
			translation.x += -this.margin;
		}
		for(var i = 0; i < this.components.length; i++) {
			var object = this.components[i];
			
			translation.y += this.spacing;
			object.x = translation.x;
			object.y = translation.y;
			
			var box = object.getRealBoundingBox();
			if(Util.boxesIntersect(box, this.getRealBoundingBox())) {
				object.draw(context);
			}
			
			translation.y += object.height;
		}
		
		this.drawFrame(context);
		
		context.restore();
	}
};

ScrollingWindow.prototype.dragScrollbars = function(p) {
	if(this.verticalScrollbar) {
		var box = this.verticalScrollbar.getBoundingBox();
		if(Util.pointInBoundingBox(p, box)) {
			return this.verticalScrollbar.getDragObject(p);
		}
	}
	else if(this.horizontalScrollbar) {
		var box = this.horizontalScrollbar.getBoundingBox();
		if(Util.pointInBoundingBox(p, box)) {
			return this.horizontalScrollbar.getDragObject(p);
		}
	}
	
	return null;
}

ScrollingWindow.prototype.getDragObject = function(p) {
    var innerPoint = {
		x: p.x - this.x,
		y: p.y - this.y
	}
	
	var dragScrollbar = this.dragScrollbars(innerPoint);
	if(dragScrollbar) {
		this.dragObject = dragScrollbar;
		return this;
	}
	
	for(var i = 0; i < this.components.length; i++) {
        var object = this.components[i];
        var box = object.getBoundingBox();

        if(Util.pointInBoundingBox(innerPoint, box)) {
			var dragObject = object.getDragObject(innerPoint);
			if(dragObject) {
				if(dragObject.canEscapeParent) {
				    // Give the object its real coordinates
				    var p = dragObject.getRealCoordinates();
					dragObject.x = p.x;
					dragObject.y = p.y;
					
					dragObject.parent = null;
					this.removeComponentAtIndex(i);
					//this.objects.splice(i, 1);
					
					this.checkScrollbars();
					return dragObject;
				}
				else {
					this.dragObject = dragObject;
					return this;
				}
			}
        }
    }
	
	return null;
};

ScrollingWindow.prototype.drag = function(dx, dy) {
	if(this.dragObject) {
		this.dragObject.drag(dx, dy);
	}
};

ScrollingWindow.prototype.allowDrop = function(object) {
	return true;
};

ScrollingWindow.prototype.acceptDrop = function(object) {
	this.addComponent(object);
	this.checkScrollbars();
	return true;
};

ScrollingWindow.prototype.highlight = function(context) {
	if(!this.hightlighted) {
		this.highlighted = true;
		this.redraw(context);
	}
};

ScrollingWindow.prototype.removeHighlight = function(context) {
	if(this.highlighted) {
		this.highlighted = false;
		this.redraw(context);
	}
};

ScrollingWindow.prototype.checkScrollbars = function() {
	if(this.verticalScrollbar) {
		this.scrollVertical(this.verticalScrollbar.y - this.verticalScrollbar.fatness);
	}
	
	if(this.horizontalScrollbar) {
	
	}
}

ScrollingWindow.prototype.scrollVertical = function(y) {
	if(this.verticalScrollbar) {
		// GET CAN THIS INFO AN ALL ADD/REMOVE instead of recalculating
		var fullHeight = 0;
		for(var i = 0; i < this.objects.length; i++) {
			fullHeight += this.spacing;
			fullHeight += this.objects[i].height;
		}
		fullHeight += this.spacing;
		
		// Adjust actually scrolling distance by what is blocked off by scrollbar itself
		// accounting also for margins
		var adjust = this.verticalScrollbar.length + 2 * this.verticalScrollbar.fatness;
		var scrollHeight = this.height - adjust;
		
		if(fullHeight > this.height) {
			this.scrollY = y / scrollHeight * (fullHeight-scrollHeight-adjust);
		}
		else {
			this.scrollY = 0;
			//this.verticalScrollbar.visible = false;
		}
	}
};

ScrollingWindow.prototype.scrollHorizontal = function(x) {
	// potato
};