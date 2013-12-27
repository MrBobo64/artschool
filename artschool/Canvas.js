/* 
 * Canvas
 */
Canvas = function(canvasElement) {
	this.canvasElement = canvasElement;
	this.context = canvasElement.getContext('2d');
	
	this.dragPoint = null;
	this.dragObject = null;
	this.dragParent = null;
	
	this.canvasElement.onmousedown = this.onMouseDown;
	this.canvasElement.onmousemove = this.onMouseMove;
	this.canvasElement.onmouseup = this.onMouseUp;
	
	this.mouseIsDown = false;
	
	this.type = 'canvas';
};
Canvas.prototype = Proto.clone(Container.prototype);

Canvas.prototype.type = 'canvas';

Canvas.prototype.getContext = function() {
	return this.context;
};

Canvas.prototype.getPointFromMouse = function(mouseEvent) {
	var x;
	var y;

	if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
		x = mouseEvent.pageX;
		y = mouseEvent.pageY;
	}
	else {
		x = mouseEvent.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
		y = mouseEvent.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
	}

	x -= this.canvasElement.offsetLeft;
	y -= this.canvasElement.offsetTop;

	var p = new Object();
	p.x = x;
	p.y = y;

	return p;
};

Canvas.prototype.drawCanvas = function() {
	if(this.canvasElement.width != window.innerWidth) {
		this.canvasElement.width = window.innerWidth;
	}
	if(this.canvasElement.height != window.innerHeight) {
		this.canvasElement.height = window.innerHeight;
	}

	this.draw(this);
};

Canvas.prototype.redrawDirtyCanvas = function(dirty) {
	this.context.clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
	
	for(var i = 0; i < this.components.length; i++) {
		var component = this.components[i];
		
		if(Util.boxesIntersect(dirty, component.getBoundingBox())) {
			component.redrawDirty(dirty, this);
		}
	}
};

// Drags an object around
//  - Difference is mouse position is sent to dragging object
//  - Objects which have been dragged over must be redrawn
//  - Objects which can accept a drop should make that obvious via highlight
Canvas.prototype.drag = function(p) {
	// Here is the dirty rectangle, redraw anything in here
	var dirty = this.dragObject.getRealBoundingBox();
	this.context.clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
	
	var dx = p.x - this.dragPoint.x;
	var dy = p.y - this.dragPoint.y;
	this.dragObject.drag(dx, dy);
	this.dragPoint = p;
	
	for(var i = 0; i < this.components.length; i++) {
		var object = this.components[i];
		if(object == this.dragObject) {
			continue;
		}
		if(!object.isContainer()) {
			continue;
		}
		
		// Redraw dirty portions
		if(Util.boxesIntersect(dirty, object.getRealBoundingBox())) {
			object.redrawDirty(dirty, this);
		}
		
		// Check for allow to drop
		if(object.allowDrop(this.dragObject)) {
			if(Util.pointInBoundingBox(p, object.getRealBoundingBox())) {
				object.setDropHighlight(this);
			}
			else {
				object.removeDropHighlight(this);
			}
		}
	}
	
	this.dragObject.redraw(this);
};

Canvas.prototype.onMouseDown = function(mouseEvent) {
	this.mouseIsDown = true;

	var p = this.getPointFromMouse(mouseEvent);
	
	for(var i = 0; i < this.components.length; i++) {
		var object = this.components[i];
		var box = object.getRealBoundingBox();

		if(Util.pointInBoundingBox(p, box)) {
			var dragObject = object.getDragObject(p);
			
			// If we got something to drag...
			if(dragObject) {
				// Pulled an orphaned object
				if(dragObject != object) {
					dragObject.parent = self;
					this.objects.push(dragObject);
					this.dragParent = object;
				}
				else {
					this.dragParent = null;
				}
		   
				this.dragObject = dragObject;
				this.dragPoint = p;
				break;
			}
		}
	}
};

Canvas.prototype.onMouseMove = function(mouseEvent) {
	if(this.dragObject != null) {
		var p = this.getPointFromMouse(mouseEvent);
		this.drag(p);
	}
};

Canvas.prototype.onMouseUp = function(mouseEvent) {
	this.mouseIsDown = false;

	if(this.dragObject != null) {
		var p = this.getPointFromMouse(mouseEvent);
		this.dropObject(p);
	}
	
	// TODO: this can't be necessary
	this.draw();
}

// If this is an inter-object drop, check to see if destination
// will accept it.  If not, return to original parent.
// If it was an intra-object drop, just stop dragging it.
Canvas.prototype.dropObject = function(p) {
	this.drag(p);
	
	if(this.dragParent) {
		var dirty = this.dragObject.getRealBoundingBox();
		
		for(var i = 0; i < this.objects.length; i++) {
			var object = this.objects[i];
			if(object == this.dragObject) {
				continue;
			}
			
			// Check for allow to drop
			if(Util.pointInBoundingBox(p, object.getRealBoundingBox())) {
				if(object.acceptDrop(this.dragObject)) {
					for(var j = 0; j < this.objects.length; j++) {
						if(this.objects[j] == this.dragObject) {
							this.objects.splice(j, 1);
							break;
						}
					}
				
					//this.context.clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
					this.redrawDirty(dirty);
					object.removeHighlight(this.context);
					object.redraw(this.context);
					this.dragObject = null;
					this.dragParent = null;
					
					break;
				}
			}
		}
		
		// If it was not accepted, return to parent
		if(this.dragObject) {
			this.dragParent.addObject(this.dragObject);
			
			for(var i = 0; i < this.objects.length; i++) {
				if(this.objects[i] == this.dragObject) {
					this.objects.splice(i, 1);
					break;
				}
			}
			//this.context.clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
			this.redrawDirty(dirty);
			this.dragParent.redraw(this.context);
			this.dragObject = null;
			this.dragParent = null;
		}
	}
	else {
		this.dragObject = null;
	}
};

Canvas.prototype.getRealCoordinates = function() {
	return {x: 0, y: 0};
};



/*this.context.lineWidth = 1;
this.context.rect(0, 0, this.context.width, this.context.height);
this.context.strokeStyle = '#FFFFFF';
this.context.stroke();*/
