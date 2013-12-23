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

    this.draw = function() {
        for(var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
            object.draw(self.context);
        }
    };

	this.redrawDirty = function(dirty) {
		for(var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
			
			if(Util.boxesIntersect(dirty, object.getRealBoundingBox())) {
				object.redrawDirty(dirty, self.context);
			}
        }
	}
	
    this.drag = function(mouseEvent) {
	    // Here is the dirty rectangle, redraw anything in here
        var dirty = self.dragObject.getRealBoundingBox();
        self.context.clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
		
        var p = self.getPointFromMouse(mouseEvent);
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
        var p = self.getPointFromMouse(mouseEvent);
        for(var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
            var box = object.getRealBoundingBox();

            if(Util.pointInBoundingBox(p, box)) {
				var dragObject = object.getDragObject(p);
				if(dragObject) {
					if(dragObject != object) {
						self.objects.push(dragObject);
						self.dragParent = object;
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
            self.drag(mouseEvent);
        }
    };

    this.onMouseUp = function(mouseEvent) {
		self.redrawDirty(self.dragObject.getRealBoundingBox());
	
		for(var i = 0; i < self.objects.length; i++) {
			var object = self.objects[i];
			if(object == self.dragObject) {
				continue;
			}
			
			// Check for allow to drop
			if(Util.pointInBoundingBox(p, object.getRealBoundingBox())) {
				if(object.acceptDrop(self.dragObject)) {
					object.removeHighlight();
					self.dragObject = null;
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
			
			self.dragParent.redraw(self.context);
			
			self.dragObject = null;
		}
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
}
