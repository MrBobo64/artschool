var Canvas = Container.extend({
	init: function(canvasElement) {
		this._super();
		this.canvasElement = canvasElement;
		this.context = canvasElement.getContext('2d');
		
		this.setType('canvas');
		
		this.draggables = [];
		
		this.dragPoint = null;
		this.dragObject = null;
		this.dragParent = null;
		
		var self = this;
		this.canvasElement.onmousedown = function(m) {
			self.onMouseDown(m);
		};
		this.canvasElement.onmousemove = function(m) {
			self.onMouseMove(m);
		};
		this.canvasElement.onmouseup = function(m) {
			self.onMouseUp(m);
		};
		
		this.mouseIsDown = false;
	},
	
	getContext: function() {
		return this.context;
	},
	
	drawCanvas: function() {
		if(this.canvasElement.width != window.innerWidth) {
            this.canvasElement.width = window.innerWidth;
			this.setWidth(window.innerWidth);
        }
        if(this.canvasElement.height != window.innerHeight) {
            this.canvasElement.height = window.innerHeight;
			this.setHeight(window.innerHeight);
        }
	
		var image = this.draw();
		this.getContext().putImageData(image, 0, 0);
	},
	
	registerDraggable: function(draggable) {
		this.draggables.push(draggable);
	},
	
	unregisterDraggable: function(draggable) {
		for(var i = 0; i < this.draggables.length; i++) {
            if(draggable == this.draggables[i]) {
                this.draggables.splice(i, 1);
                break;
            }
        }
	},
	
	getPointFromMouse: function(mouseEvent) {
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
    },
	
	drag: function(p) {
        // Here is the dirty rectangle, redraw anything in here
        var dirty = this.dragObject.getRealBoundingBox();
        //this.clearBox(dirty);
        
        var dx = p.x - this.dragPoint.x;
        var dy = p.y - this.dragPoint.y;
        this.dragObject.drag(dx, dy);
        this.dragPoint = p;
        
        /*for(var i = 0; i < this.components.length; i++) {
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
        
        this.dragObject.redraw(this);*/
		
		this.drawCanvas();
    },

    onMouseDown: function(mouseEvent) {
        this.mouseIsDown = true;

        var p = this.getPointFromMouse(mouseEvent);
        
        for(var i = 0; i < this.draggables.length; i++) {
            var object = this.draggables[i];
            var box = object.getRealBoundingBox();

            if(Util.pointInBoundingBox(p, box)) {
                var dragObject = object;
				
				if(dragObject.canEscapeParent()) {
					this.dragParent = dragObject.getParent();
					this.addComponent(dragObject);
					
					var realCoords = dragObject.getRealCoordinates();
					dragObject.x = realCoords.x;
					dragObject.y = realCoords.y;
				}

                this.dragPoint = p;
				this.dragObject = dragObject;
                break;
            }
        }
    },
	
    onMouseMove: function(mouseEvent) {
        if(this.dragObject != null) {
            var p = this.getPointFromMouse(mouseEvent);
            this.drag(p);
        }
    },

    onMouseUp: function(mouseEvent) {
        this.mouseIsDown = false;

        if(this.dragObject != null) {
            var p = this.getPointFromMouse(mouseEvent);
            this.dropObject(p);
        }
        
        // TODO: this can't be necessary
        //this.drawCanvas();
    },
    
    // If this is an inter-object drop, check to see if destination
    // will accept it.  If not, return to original parent.
    // If it was an intra-object drop, just stop dragging it.
    dropObject: function(p) {
        this.drag(p);
        
        if(this.dragParent) {
            var dirty = this.dragObject.getRealBoundingBox();
            
            for(var i = 0; i < this.components.length; i++) {
                var object = this.components[i];
                if(object == this.dragObject) {
                    continue;
                }
                
                // Check for allow to drop
                if(Util.pointInBoundingBox(p, object.getRealBoundingBox())) {
                    if(object.acceptDrop(this.dragObject)) {
                        this.removeComponent(this.dragObject);
                        //for(var j = 0; j < this.objects.length; j++) {
                        //  if(this.objects[j] == this.dragObject) {
                        //      this.objects.splice(j, 1);
                        //      break;
                        //  }
                        //}
                        
                        this.redrawDirtyCanvas(dirty);
                        object.removeDropHighlight(this);
                        //object.redraw(this);
                        this.dragObject = null;
                        this.dragParent = null;
                        
                        break;
                    }
                }
            }
            
            // If it was not accepted, return to parent
            if(this.dragObject) {
                this.removeComponent(this.dragObject);
                this.dragParent.addComponent(this.dragObject);
                
                this.redrawDirtyCanvas(dirty);
                this.dragParent.redraw(this);
                this.dragObject = null;
                this.dragParent = null;
            }
        }
        else {
            this.dragObject = null;
        }
    }
});

/* 
 * Canvas extends Container
 */
/*function Canvas(canvasElement) {
    //this.prototype = new Container();
    //this.prototype.constructor = Canvas;
    
    Container.call(this);
    //console.log("Canvas Constructor");
    
    var self = this;

	this.canvasElement = canvasElement;
	this.context = canvasElement.getContext('2d');
	
	this.dragPoint = null;
	this.dragObject = null;
	this.dragParent = null;
	
	this.canvasElement.onmousedown = function(m) {
        self.onMouseDown(m);
    };
	this.canvasElement.onmousemove = function(m) {
        self.onMouseMove(m);
    };
	this.canvasElement.onmouseup = function(m) {
        self.onMouseUp(m);
    };
	
	this.mouseIsDown = false;
	this.type = 'canvas';

    this.getContext = function() {
        return this.context;
    };

    this.getPointFromMouse = function(mouseEvent) {
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

    this.drawCanvas = function() {
        if(this.canvasElement.width != window.innerWidth) {
            this.canvasElement.width = window.innerWidth;
        }
        if(this.canvasElement.height != window.innerHeight) {
            this.canvasElement.height = window.innerHeight;
        }
        
        this.draw(this);
    };

    this.clearBox = function(dirty) {
        this.context.clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
    };
    
    this.redrawDirtyCanvas = function(dirty) {
        this.clearBox(dirty);
        
        for(var i = 0; i < this.components.length; i++) {
            var component = this.components[i];
            
            if(Util.boxesIntersect(dirty, component.getBoundingBox())) {
                component.redrawDirty(dirty, this);
            }
        }
    };

    // Drags an object around
    //  - Difference in mouse position is sent to dragging object
    //  - Objects which have been dragged over must be redrawn
    //  - Objects which can accept a drop should make that obvious via highlight
    this.drag = function(p) {
        // Here is the dirty rectangle, redraw anything in here
        var dirty = this.dragObject.getRealBoundingBox();
        this.clearBox(dirty);
        
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

    this.onMouseDown = function(mouseEvent) {
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
                        dragObject.parent = this;
                        //this.components.push(dragObject);
                        this.addComponent(dragObject);
                        this.dragParent = object;
                        
                        var realCoords = dragObject.getRealCoordinates();
                        dragObject.x = realCoords.x;
                        dragObject.y = realCoords.y;
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

    this.onMouseMove = function(mouseEvent) {
        if(this.dragObject != null) {
            var p = this.getPointFromMouse(mouseEvent);
            this.drag(p);
        }
    };

    this.onMouseUp = function(mouseEvent) {
        this.mouseIsDown = false;

        if(this.dragObject != null) {
            var p = this.getPointFromMouse(mouseEvent);
            this.dropObject(p);
        }
        
        // TODO: this can't be necessary
        //this.drawCanvas();
    }
    
    // If this is an inter-object drop, check to see if destination
    // will accept it.  If not, return to original parent.
    // If it was an intra-object drop, just stop dragging it.
    this.dropObject = function(p) {
        this.drag(p);
        
        if(this.dragParent) {
            var dirty = this.dragObject.getRealBoundingBox();
            
            for(var i = 0; i < this.components.length; i++) {
                var object = this.components[i];
                if(object == this.dragObject) {
                    continue;
                }
                
                // Check for allow to drop
                if(Util.pointInBoundingBox(p, object.getRealBoundingBox())) {
                    if(object.acceptDrop(this.dragObject)) {
                        this.removeComponent(this.dragObject);
                        //for(var j = 0; j < this.objects.length; j++) {
                        //  if(this.objects[j] == this.dragObject) {
                        //      this.objects.splice(j, 1);
                        //      break;
                        //  }
                        //}
                        
                        this.redrawDirtyCanvas(dirty);
                        object.removeDropHighlight(this);
                        //object.redraw(this);
                        this.dragObject = null;
                        this.dragParent = null;
                        
                        break;
                    }
                }
            }
            
            // If it was not accepted, return to parent
            if(this.dragObject) {
                this.removeComponent(this.dragObject);
                this.dragParent.addComponent(this.dragObject);
                
                this.redrawDirtyCanvas(dirty);
                this.dragParent.redraw(this);
                this.dragObject = null;
                this.dragParent = null;
            }
        }
        else {
            this.dragObject = null;
        }
    };

    this.getRealCoordinates = function() {
        return {x: 0, y: 0};
    };
}
*/
