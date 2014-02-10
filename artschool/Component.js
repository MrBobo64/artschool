var Component = Class.extend({
	getWatchers: function() {
		return this.watchers;
	},
	
	addWatcher: function(watcher) {
		this.getWatchers().push(watcher);
	},
	
	removeWatcher: function(watcher) {
		var watchers = this.getWatchers();
		for(var i = 0; i < watchers.length; i++) {
			if(watcher == watchers[i]) {
				watchers.splice(i, 1);
				break;
			}
		}
	},
	
	notifyWatchers: function() {
		var watchers = this.getWatchers();
		for(var i = 0; i < watchers.length; i++) {
			var w = watchers[i];
			
			w.watchChanged(this);
		}
	},
	
	watchChanged: function(component) {
	
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
		var notify = !!(this.x != x);
	
		this.x = x;
		
		if(notify) {
			this.notifyWatchers();
		}
	},
	
	getY: function() {
		return this.y;
	},
	
	setY: function(y) {
		var notify = !!(this.y != y);
		
		this.y = y;
		
		if(notify) {
			this.notifyWatchers();
		}
	},
	
	getWidth: function() {
		if(this.width == 0) {
			return 1;
		}
		return this.width;
	},
	
	setWidth: function(width) {
		if(width < 0) {
			console.error("impossible width");
		}
		var notify = !!(this.width != width);
		
		this.width = width;
		
		if(notify) {
			this.notifyWatchers();
		}
	},
	
	getHeight: function() {
		if(this.height == 0) {
			return 1;
		}
		return this.height;
	},
	
	setHeight: function(height) {
		if(height < 0) {
			console.error("impossible height");
		}
		var notify = !!(this.height != height);
		
		this.height = height;
		
		if(notify) {
			this.notifyWatchers();
		}
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
		this.setX(this.getX() + dx);
		this.setY(this.getY() + dy);
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
	
	getNewContext: function() {
		this.canvas = null;
		return this.getContext();
	},
	
	makeNewContext: function() {
		this.getNewContext();
	},
	
	draw: function() {
		console.error("probably wrong");
		//return this.getContext().getImageData(0, 0, this.getWidth(), this.getHeight()); //?
	},
	
	// init
	init: function(config) {
		this.x = config && config.x || 0;
		this.y = config && config.y || 0;
		this.width = config && config.width || 0;
		this.height = config && config.height || 0;
		this.visible = true;
		
		this.type = 'component';
		this.parent = null;
		
		this.arrangement = new Arrangement();
		
		this.watchers = [];
	}
});
