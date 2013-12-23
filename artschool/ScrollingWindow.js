/* Scrollbar extends Shape */

Scrollbar = function(scrollingWindow, vertical) {
    this.x = 0;
	this.y = 0;

    this.scrollingWindow = scrollingWindow;
	this.vertical = vertical;
	
	this.length = 30;
	this.fatness = 8;
	
	this.isDraggable = true;
	
	if(vertical) {
		this.width = this.fatness;
		this.height = this.length;
	}
	else {
		this.width = this.length;
		this.height = this.fatness;
	}
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

ScrollingWindow = function(x, y, width, height, viewWidth, viewHeight, scrollHorizontal, scrollVertical) {
    this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.viewWidth = viewWidth;
	this.viewHeight = viewHeight;
	
	this.scrollX = 0;
	this.scrollY = 0;
	
	this.objects = new Array();
	
	this.horizontalScrollbar = null;
	this.verticalScrollbar = null;
	
	if(scrollHorizontal) {
	    this.horizontalScrollbar = new Scrollbar(this, false);
	}
	if(scrollVertical) {
	    this.verticalScrollbar = new Scrollbar(this, true);
		this.verticalScrollbar.x = this.viewWidth - this.verticalScrollbar.fatness - 2;
		this.verticalScrollbar.y = this.verticalScrollbar.fatness;
		console.log(this.verticalScrollbar);
	}
	
	this.isDraggable = false;
	
	this.dragObject = null;
};
ScrollingWindow.prototype = Proto.clone(Shape.prototype);

ScrollingWindow.prototype.toString = function() {
    return 'ScrollingWindow (' + this.x + ', ' + this.y + '): ' + this.width + ' x ' + this.height;
};

ScrollingWindow.prototype.draw = function(context) {
    context.save();
        
    context.translate(this.x, this.y);
    
	if(this.horizontalScrollbar) {
	    this.horizontalScrollbar.draw(context);
	}
	if(this.verticalScrollbar) {
	    this.verticalScrollbar.draw(context);
	}
	
    context.lineWidth = 1;
    context.rect(0, 0, this.viewWidth, this.viewHeight);
    context.stroke();
    context.clip();
        
    for(var i = 0; i < this.objects.length; i++) {
        var object = this.objects[i];
           
        var box = object.getBoundingBox();
        if(Util.boxesIntersect(box, this.getBoundingBox())) {
            object.draw(context);
        }
    }
    
    context.restore();
};

ScrollingWindow.prototype.willDrag = function(p) {
	for(var i = 0; i < this.objects.length; i++) {
        var object = this.objects[i];
        var box = object.getBoundingBox();

        if(Util.pointInBoundingBox(p, box)) {
			if(object.willDrag(p)) {
				return true;
			}
        }
    }
	
	return false;
};

ScrollingWindow.prototype.getDragObject = function(p) {
console.log("SCROLL WINDOW CHECKING TIME");
    var innerPoint = {
		x: p.x - this.x,
		y: p.y - this.y
	}

    var objects = this.objects.slice(0);
	if(this.verticalScrollbar) {
		objects.push(this.verticalScrollbar);
	}
	if(this.horizontalScrollbar) {
		objects.push(this.horizontalScrollbar);
	}

	for(var i = 0; i < objects.length; i++) {
        var object = objects[i];
        var box = object.getBoundingBox();

        if(Util.pointInBoundingBox(innerPoint, box)) {
		console.log("Found you");
			var dragObject = object.getDragObject(innerPoint);
			if(dragObject) {
			    //return dragObject;
				this.dragObject = dragObject;
				return this;
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