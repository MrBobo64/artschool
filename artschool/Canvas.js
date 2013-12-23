/* 
 * Canvas
 */
function Canvas(canvasElement) {
    var self = this;

	// Finds point within the canvas
    this.getPointFromMouse = function(e) {
        var x;
        var y;

        if (e.pageX != undefined && e.pageY != undefined) {
            x = e.pageX;
            y = e.pageY;
        }
        else {
            x = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
        }

        x -= self.canvasElement.offsetLeft;
        y -= self.canvasElement.offsetTop;

        var p = new Object();
        p.x = x;
        p.y = y;

        return p;
    };

	// Draws each object registered to the canvas (top-level objects, most like)
    this.draw = function() {
        for(var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
            object.draw(self.context);
        }
    };

	// Redraw objects falling into the dirty rectangle
	this.redrawDirty = function(dirty) {
		self.context.clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
	
		for(var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
			
			if(Util.boxesIntersect(dirty, object.getBoundingBox())) {
				object.redrawDirty(dirty, self.context);
			}
        }
	}
	
	// Drags an object around
	//  - Diffenence is mouse position is sent to dragging object
	//  - Objects which have been dragged over must be redrawn
	//  - Objects which can accept a drop should make that obvious via highlight
    this.drag = function(p) {
	    // Here is the dirty rectangle, redraw anything in here
        var dirty = self.dragObject.getRealBoundingBox();
        self.context.clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
		
		var dx = p.x - self.dragPoint.x;
		var dy = p.y - self.dragPoint.y;
        self.dragObject.drag(dx, dy);
        self.dragPoint = p;
		
		for(var i = 0; i < self.objects.length; i++) {
			var object = self.objects[i];
			if(object == self.dragObject) {
				continue;
			}
			
			// Redraw dirty portions
			if(Util.boxesIntersect(dirty, object.getRealBoundingBox())) {
				object.redrawDirty(dirty, self.context);
			}
			
			// Check for allow to drop
			if(object.allowDrop(self.dragObject)) {
				if(Util.pointInBoundingBox(p, object.getRealBoundingBox())) {
					object.highlight(self.context);
				}
				else {
					object.removeHighlight(self.context);
				}
			}
		}
		
        self.dragObject.redraw(self.context);
    };

    this.onMouseDown = function(mouseEvent) {
		self.mouseIsDown = true;
	
        var p = self.getPointFromMouse(mouseEvent);
		
        for(var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
            var box = object.getRealBoundingBox();

            if(Util.pointInBoundingBox(p, box)) {
				var dragObject = object.getDragObject(p);
				
				// If we got something to drag...
				if(dragObject) {
				    // Pulled an orphaned object
					if(dragObject != object) {
						dragObject.parent = self;
						self.objects.push(dragObject);
						self.dragParent = object;
					}
					else {
						self.dragParent = null;
					}
			   
					self.dragObject = dragObject;
				    self.dragPoint = p;
				    break;
				}
            }
        }
    };

    this.onMouseMove = function(mouseEvent) {
        if(self.dragObject != null) {
			var p = self.getPointFromMouse(mouseEvent);
            self.drag(p);
        }
    };

    this.onMouseUp = function(mouseEvent) {
		self.mouseIsDown = false;
	
		if(self.dragObject != null) {
			var p = self.getPointFromMouse(mouseEvent);
			self.dropObject(p);
		}
		
		self.draw();
	}
	
	// If this is an inter-object drop, check to see if destination
	// will accept it.  If not, return to original parent.
	// If it was an intra-object drop, just stop dragging it.
	this.dropObject = function(p) {
		self.drag(p);
		
		if(self.dragParent) {
			var dirty = self.dragObject.getRealBoundingBox();
			
			for(var i = 0; i < self.objects.length; i++) {
				var object = self.objects[i];
				if(object == self.dragObject) {
					continue;
				}
				
				// Check for allow to drop
				if(Util.pointInBoundingBox(p, object.getRealBoundingBox())) {
					if(object.acceptDrop(self.dragObject)) {
						for(var j = 0; j < self.objects.length; j++) {
							if(self.objects[j] == self.dragObject) {
								self.objects.splice(j, 1);
								break;
							}
						}
					
						//self.context.clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
						self.redrawDirty(dirty);
						object.removeHighlight(self.context);
						object.redraw(self.context);
						self.dragObject = null;
						self.dragParent = null;
						
						break;
					}
				}
			}
			
			// If it was not accepted, return to parent
			if(self.dragObject) {
				self.dragParent.addObject(self.dragObject);
				
				for(var i = 0; i < self.objects.length; i++) {
					if(self.objects[i] == self.dragObject) {
						self.objects.splice(i, 1);
						break;
					}
				}
				//self.context.clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
				self.redrawDirty(dirty);
				self.dragParent.redraw(self.context);
				self.dragObject = null;
				self.dragParent = null;
			}
		}
		else {
			self.dragObject = null;
		}
    };
	
	this.getRealCoordinates = function() {
		return {x: 0, y: 0};
	};
	
    this.canvasElement = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.objects = new Array();
    this.dragPoint = null;
    this.dragObject = null;
	this.dragParent = null;

    this.canvasElement.onmousedown = this.onMouseDown;
    this.canvasElement.onmousemove = this.onMouseMove;
    this.canvasElement.onmouseup = this.onMouseUp;
	
	this.mouseIsDown = false;
}
