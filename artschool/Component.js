function Component() {
    //console.log("Component Constructor");
    
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.draggable = false;
	this.canEscaleParent = false;
	this.visible = true;
	this.type = 'component';
	this.parent = null;
	
	this.draw = function(canvas) {
		console.error('Cannot draw ' + this.type);
	};
	
	this.redraw = function(canvas) {
		this.draw(canvas);
	};
	
	this.redrawDirty = function(dirty, canvas) {
		this.redraw(canvas);
	};
	
	this.isDraggable = function() {
		return this.draggable;
	};
	
	this.isVisible = function() {
		return this.visible;
	};
	
	this.getBoundingBox = function() {
		return new Box(this.x, this.y, this.width, this.height);
	};
	
	this.toString = function() {
		return this.type + ': (' + this.x + ', ' + this.y + '): ' + this.width + ' x ' + this.height;
	};
	
	this.getDragObject = function(p) {
	    if(this.isDraggable()) {
		    return this;
		}
		
		return null;
	};
	
	this.drag = function(dx, dy) {
		this.x += dx;
		this.y += dy;
	};
	
	this.getRealCoordinates = function() {
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
	};
	
	this.getRealBoundingBox = function() {
		var p = this.getRealCoordinates();
		return new Box(p.x, p.y, this.width, this.height);
	};
	
	this.getHierarchy = function() {
		var hier = [];
		hier.push(this.type);
		
		var p = this.parent;
		while(p) {
			hier.push(p.type);
			p = p.parent;
		}
		
		return hier;
	};
	
	this.isContainer = function() {
		return false;
	};
}
