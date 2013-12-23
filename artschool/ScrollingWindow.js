/* Scrollbar extends Shape */

Scrollbar = function(scrollingWindow, vertical) {
    this.x = 0;
	this.y = 0;

    this.scrollingWindow = scrollingWindow;
	this.vertical = vertical;
	
	this.length = 30;
	this.fatness = 8;
	
	this.isDraggable = true;
	this.canEscapeParent = false;
	
	if(vertical) {
		this.width = this.fatness;
		this.height = this.length;
	}
	else {
		this.width = this.length;
		this.height = this.fatness;
	}
	
	this.highlighted = false;
};
Scrollbar.prototype = Proto.clone(Shape.prototype);

Scrollbar.prototype.toString = function() {
	if(this.vertical) {
		return 'ScrollBar (v) (' + this.x + ', ' + this.y + '): ' + this.width + ' x ' + this.height;
	}
	else {
		return 'ScrollBar (h) (' + this.x + ', ' + this.y + '): ' + this.width + ' x ' + this.height;
	}
};

Scrollbar.prototype.draw = function(context) {
    context.save();
	
	context.translate(this.x, this.y);
	
	context.beginPath();
	context.moveTo(0, 0);
	if(this.vertical) {
	    context.lineTo(0, this.length);
	}
	else {
	    context.lineTo(this.length, 0);
	}
	context.lineWidth = this.fatness;
	context.lineCap = 'round';
	
	context.strokeStyle = '#777777';
	context.stroke();
	
	context.restore();
};

Scrollbar.prototype.getBoundingBox = function() {
    if(this.vertical) {
	    return new Box(this.x - this.fatness/2, this.y, this.width, this.height);
	}
	else {
		return new Box(this.x, this.y - this.fatness/2, this.width, this.height);
	}
};

Scrollbar.prototype.drag = function(dx, dy) {
    if(this.vertical) {
	    this.y += dy;
		if(this.y < this.fatness) {
		    this.y = this.fatness;
		}
		if(this.y > this.scrollingWindow.viewHeight - this.length - this.fatness) {
		    this.y = this.scrollingWindow.viewHeight - this.length - this.fatness;
		}
	}
	else {
		this.x += dx;
		if(this.x < this.fatness) {
		    this.x = this.fatness;
		}
		if(this.x > this.scrollingWindow.viewWidth - this.fatness) {
		    this.x = this.scrollingWindow.viewWidth - this.fatness;
		}
	}
};


/* ScrollingWindow extends Shape (and maybe "Window" or something that
   it has in common with Canvas
*/
// Needs object coordinating how to place items inside, right now, going vertically

ScrollingWindow = function(x, y, width, height, viewWidth, viewHeight, scrollHorizontal, scrollVertical) {
    this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.viewWidth = viewWidth;
	this.viewHeight = viewHeight;
	
	this.scrollX = 0;
	this.scrollY = 0;
	
	this.justify = 'left';
	this.margin = 10;
	this.spacing = 10;
	
	this.objects = new Array();
	
	this.horizontalScrollbar = null;
	this.verticalScrollbar = null;
	
	if(scrollHorizontal) {
	    this.horizontalScrollbar = new Scrollbar(this, false);
		this.horizontalScrollbar.x = this.horizontalScrollbar.fatness + 2;
		this.horizontalScrollbar.y = this.viewHeight - this.horizontalScrollbar.fatness - 2;
	}
	if(scrollVertical) {
	    this.verticalScrollbar = new Scrollbar(this, true);
		this.verticalScrollbar.x = this.viewWidth - this.verticalScrollbar.fatness - 2;
		this.verticalScrollbar.y = this.verticalScrollbar.fatness;
	}
	
	this.isDraggable = false;
	
	this.dragObject = null;
};
ScrollingWindow.prototype = Proto.clone(Shape.prototype);

ScrollingWindow.prototype.toString = function() {
    return 'ScrollingWindow (' + this.x + ', ' + this.y + '): ' + this.width + ' x ' + this.height;
};

// Draw scrollbars
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
    context.rect(0, 0, this.viewWidth, this.viewHeight);
    context.stroke();
    context.clip();
};

ScrollingWindow.prototype.draw = function(context) {
    context.save();
	
    context.translate(this.x, this.y);
    
	this.drawScrollbars(context);
	this.drawFrame(context);

	var translation = { x:0, y:0 };
	//translation.x = this.x;
	//translation.y = this.y;
	
	if(this.justify == 'left') {
		//context.translate(this.margin, 0);
		translation.x += this.margin;
	}
	else if(this.justify == 'right') {
		//context.translate(-this.margin, 0);
		translation.x += -this.margin;
	}
    for(var i = 0; i < this.objects.length; i++) {
        var object = this.objects[i];
        
        var box = object.getBoundingBox();
        if(Util.boxesIntersect(box, this.getBoundingBox())) {
			//context.translate(0, this.spacing);
			translation.y += this.spacing;
			object.x = translation.x;
			object.y = translation.y;
			
            object.draw(context);
			//context.translate(0, object.height);
			translation.y += object.height;
        }
    }
    
    context.restore();
};

ScrollingWindow.prototype.addObject = function(o) {
    // Taking over placement
    o.x = 0;
	o.y = 0;
	
	o.parent = this;
	
	this.objects.push(o);
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
	
	for(var i = 0; i < this.objects.length; i++) {
        var object = this.objects[i];
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
					this.objects.splice(i, 1);
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
	console.log(this);
	console.log("accepting drop of");
	console.log(object);
	
	this.addObject(object);
	return true;
};

ScrollingWindow.prototype.highlight = function(context) {
	if(!this.hightlighted) {
		this.highlighted = true;
		this.redraw(context);
	}
}

ScrollingWindow.prototype.removeHighlight = function(context) {
	if(this.highlighted) {
		this.highlighted = false;
		this.redraw(context);
	}
}