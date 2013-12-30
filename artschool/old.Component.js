function Component() {};
Component.prototype = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	draggable: false,
	canEscaleParent: false,
	visible: true,
	type: 'component',
	parent: null,
	
	draw: function(canvas) {
		console.error('Cannot draw ' + this.type);
	},
	
	redraw: function(canvas) {
		this.draw(canvas);
	},
	
	redrawDirty: function(dirty, canvas) {
		this.redraw(canvas);
	},
	
	isDraggable: function() {
		return this.draggable;
	},
	
	isVisible: function() {
		return this.visible;
	},
	
	getBoundingBox: function() {
		return new Box(this.x, this.y, this.width, this.height);
	},
	
	toString: function() {
		return this.type + ': (' + this.x + ', ' + this.y + '): ' + this.width + ' x ' + this.height;
	},
	
	getDragObject: function(p) {
	    if(this.isDraggable()) {
		    return this;
		}
		
		return null;
	},
	
	drag: function(dx, dy) {
		this.x += dx;
		this.y += dy;
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
	
	getHierarchy: function() {
		var hier = [];
		hier.push(this.type);
		
		var p = this.parent;
		while(p) {
			hier.push(p.type);
			p = p.parent;
		}
		
		return hier;
	},
	
	isContainer: function() {
		return false;
	}
};
Component.prototype.constructor = Component;