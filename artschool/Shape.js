Shape = new Object();
Shape.prototype = {
    draw: function() {
	    console.log('CANNOT DRAW SHAPE: ' + this);
	},
	redraw: function(context) {
		this.draw(context);
	},
	drag: function(dx, dy) {
        this.x += dx;
        this.y += dy;
    },
    getBoundingBox: function() {
	    return new Box(this.x, this.y, this.width, this.height);
	},
	willDrag: function(p) {
		return this.isDraggable;
	},
	getDragObject: function(p) {
	    if(this.isDraggable) {
		    return this;
		}
		
		return null;
	},
    toString: function() {
	    return 'Shape (' + this.x + ', ' + this.y + '): ' + this.width + ' x ' + this.height;
	}
};
