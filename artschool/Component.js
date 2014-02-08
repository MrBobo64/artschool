var Component = Class.extend({
	init: function() {
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.visible = true;
		this.type = 'component';
		this.parent = null;
		
		this.arrangement = new Arrangement();
	},
	
	getParent: function() {
		return this.parent;
	},
	
	setParent: function(parent) {
		this.parent = parent;
	},
	
	getArrangement: function() {
		return this.arrangement;
	},
	
	setArrangement: function(arrangement) {
		this.arrangement = arrangement;
	},
	
	getX: function() {
		return this.x;
	},
	
	setX: function(x) {
		this.x = x;
	},
	
	getY: function() {
		return this.y;
	},
	
	setY: function(y) {
		this.y = y;
	},
	
	getWidth: function() {
		return this.width;
	},
	
	setWidth: function(width) {
		if(width < 0) {
			console.error("impossible width");
		}
		this.width = width;
	},
	
	getHeight: function() {
		return this.height;
	},
	
	setHeight: function(height) {
		if(height < 0) {
			console.error("impossible height");
		}
		this.height = height;
	},
	
	getType: function() {
		return this.type;
	},
	
	setType: function(type) {
		this.type = type;
	},
	
	isDraggable: function() {
		return false;
	},
	
	isVisible: function() {
		return this.visible;
	},
	
    canEscapeParent: function() {
        return false;
    },
    
	getBoundingBox: function() {
		return new Box(this.getX(), this.getY(), this.getWidth(), this.getHeight());
	},
	
	toString: function() {
		return this.getType() + ': (' + this.getX() + ', ' + this.getY() + '): ' + this.getWidth() + ' x ' + this.getHeight();
	},
	
	drag: function(dx, dy) {
		this.setX(this.getX() += dx);
		this.setY(this.getY() += dy);
	},
	
	getRealCoordinates: function() {
		var p = {x: 0, y: 0};
	
		if(!this.parent) {
			p.x = this.getX();
			p.y = this.getY();
		}
		else {
			var par = this.parent.getRealCoordinates();
			p.x = this.getX() + par.x;
			p.y = this.getY() + par.y;
		}
		
		return p;
	},
	
	getRealBoundingBox: function() {
		var p = this.getRealCoordinates();
		return new Box(p.x, p.y, this.getWidth(), this.getHeight());
	},
	
	getHierarchy: function() {
		var hier = [];
		hier.push(this.getType());
		
		var p = this.parent;
		while(p) {
			hier.push(p.type);
			p = p.parent;
		}
		
		return hier;
	},
	
	isContainer: function() {
		return false;
	},
	
	stretchTo: function(width, height) {
		this.setWidth(width);
		this.setHeight(height);
	},
	
	getCanvas: function() {
		if(!this.canvas) { //TODO
			var canvas = document.createElement('canvas');
			canvas.width  = this.getWidth();
			canvas.height = this.getHeight();
			canvas.style.hidden = true;
			
			this.canvas = canvas;
		}
		
		return this.canvas;
	},
	
	getContext: function() {
		return this.getCanvas().getContext('2d');
	},
	
	draw: function() {
		console.error("probably wrong");
		return this.getContext().getImageData(0, 0, this.getWidth(), this.getHeight()); //?
	}
});
