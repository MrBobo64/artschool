Shape = new Object();
Shape.prototype = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	isDraggable: true,
	canEscapeParent: true,
	parent: null,
	visible: true,
	
    draw: function(context) {
	    console.log('CANNOT DRAW SHAPE: ' + this);
	},
	redraw: function(context) {
	    context.clearRect(this.x, this.y, this.width, this.height);
		this.draw(context);
	},
	redrawDirty: function(dirty, context) {
		this.redraw(context);
	},
	drag: function(dx, dy) {
        this.x += dx;
        this.y += dy;
    },
    getBoundingBox: function() {
	    return new Box(this.x, this.y, this.width, this.height);
	},
	getDragObject: function(p) {
	    if(this.isDraggable) {
		    return this;
		}
		
		return null;
	},
	getRealCoordinates: function() {
		var p = {x: 0, y: 0};
	
		if(!this.parent) {
			p.x = this.x;
			p.y = this.y;
		}
		else {
			var par = this.parent.getRealCoordinates();
			p.x = this.x + par.x;
			p.y = this.y + par.y;
		}
		
		return p;
	},
	getRealBoundingBox: function() {
		var p = this.getRealCoordinates();
		return new Box(p.x, p.y, this.width, this.height);
	},
	allowDrop: function(object) {
		return false;
	},
	acceptDrop: function(object) {
		return false;
	},
	highlight: function(context) {
		
	},
	removeHighlight: function(context) {
	
	},
	
    toString: function() {
	    return 'Shape (' + this.x + ', ' + this.y + '): ' + this.width + ' x ' + this.height;
	}
};
