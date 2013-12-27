/* Scrollbar extends Shape */
Scrollbar = function(scrollingWindow, vertical) {
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
	this.type = 'scrollbar' + (this.vertical ? '(v)' : '(h)');
};
Scrollbar.prototype = Proto.clone(Shape.prototype);

Scrollbar.prototype.draw = function(canvas) {
	if(this.visible) {
		var context = canvas.getContext();
		
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
	}
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
		if(this.y > this.scrollingWindow.height - this.length - this.fatness) {
		    this.y = this.scrollingWindow.height - this.length - this.fatness;
		}
		
		this.scrollingWindow.scrollVertical(this.y - this.fatness);
	}
	else {
		this.x += dx;
		if(this.x < this.fatness) {
		    this.x = this.fatness;
		}
		if(this.x > this.scrollingWindow.width - this.fatness) {
		    this.x = this.scrollingWindow.width - this.fatness;
		}
		
		this.scrollingWindow.scrollHorizontal(this.x - this.fatness);
	}
};