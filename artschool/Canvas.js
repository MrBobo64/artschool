// ONLY ALLOW ONE CHILD COMPONENT, STRETCH IT OuT?

var Canvas = Container.extend({
	getContext: function() {
		return this.context;
	},
	
	fixDimensions: function() {
		if(this.canvasElement.width != window.innerWidth) {
            this.canvasElement.width = window.innerWidth - 16;
			this.setWidth(window.innerWidth - 16);
        }
        if(this.canvasElement.height != window.innerHeight) {
            this.canvasElement.height = window.innerHeight;
			this.setHeight(window.innerHeight);
        }
	},
	
	drawCanvas: function() {
		this.fixDimensions();
	
		var image = this.draw();
		this.getContext().putImageData(image, 0, 0);
	},
	
	clearBox: function(dirty) {
        this.getContext().clearRect(dirty.x, dirty.y, dirty.width, dirty.height);
    },
	
	redrawDirty: function(dirty) {
		this.clearBox(dirty);
		
		var components = this.getComponents();
		for(var i = 0; i < components.length; i++) {
			var c = components[i];
			
			var box = c.getRealBoundingBox();
			if(Util.boxesIntersect(dirty, box)) {
				this.getContext().putImageData(c.draw(), box.x, box.y);
			}
		}
	},
	
	getDraggables: function() {
		return this.dragData.draggables;
	},
	
	registerDraggable: function(draggable) {
		this.getDraggables().push(draggable);
	},
	
	unregisterDraggable: function(draggable) {
		var draggables = this.getDraggables();
		for(var i = 0; i < draggables.length; i++) {
            if(draggable == draggables[i]) {
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

    onMouseDown: function(mouseEvent) {
        this.mouseIsDown = true;

        var p = this.getPointFromMouse(mouseEvent);
        this.pickupObject(p);
	},
	
    onMouseMove: function(mouseEvent) {
        if(this.mouseIsDown && this.dragData.dragObject != null) {
            var p = this.getPointFromMouse(mouseEvent);
            this.dragObject(p);
        }
    },

    onMouseUp: function(mouseEvent) {
        this.mouseIsDown = false;

        if(this.dragData.dragObject != null) {
            var p = this.getPointFromMouse(mouseEvent);
            this.dropObject(p);
        }
    },
	
	pickupObject: function(p) {
		var draggables = this.getDraggables();
        for(var i = 0; i < draggables.length; i++) {
            var object = draggables[i];
            var box = object.getRealBoundingBox();
			
            if(Util.pointInBoundingBox(p, box)) {			
				if(object.canEscapeParent()) {
					var realCoords = object.getRealCoordinates();
				
					this.dragData.dragParent = object.getParent();
					this.dragData.dragParent.removeComponent(object);
					this.addComponent(object);
					
					object.setX(realCoords.x);
					object.setY(realCoords.y);
					
					var parent = this.dragData.dragParent;
					this.redrawDirty(parent.getRealBoundingBox());
				}

                this.dragData.dragPoint = p;
				this.dragData.dragObject = object;
				
                break;
            }
        }
    },
    
	dragObject: function(p) {
        // Here is the dirty rectangle, redraw anything in here
        var dirty = this.dragData.dragObject.getRealBoundingBox();
		this.clearBox(dirty);
        
        var dx = p.x - this.dragData.dragPoint.x;
        var dy = p.y - this.dragData.dragPoint.y;
        this.dragData.dragObject.drag(dx, dy);
        this.dragData.dragPoint = p;
		
		var components = this.getComponents();
        for(var i = 0; i < components.length; i++) {
            var object = components[i];
            if(object == this.dragData.dragObject) {
                continue;
            }
			
			// Redraw dirty portions
			if(Util.boxesIntersect(dirty, object.getRealBoundingBox())) {
				this.getContext().putImageData(object.draw(), object.getX(), object.getY(),
						dirty.x, dirty.y, dirty.width, dirty.height);
            }
			
            if(!object.isContainer()) {
                continue;
            }
            
            // Check for allow to drop
            if(object.allowDrop(this.dragData.dragObject)) {
                if(Util.pointInBoundingBox(p, object.getRealBoundingBox())) {
                    object.setDropHighlight(this);
                }
                else {
                    object.removeDropHighlight(this);
                }
            }
        }
		
		var d = this.dragData.dragObject;
		this.getContext().putImageData(d.draw(), d.getX(), d.getY());
    },
	
    // If this is an inter-object drop, check to see if destination
    // will accept it.  If not, return to original parent.
    // If it was an intra-object drop, just stop dragging it.
    dropObject: function(p) {
        this.dragObject(p);
        
		var dirty = this.dragData.dragObject.getRealBoundingBox();
		
        if(this.dragData.dragParent) {
			var components = this.getComponents();
            for(var i = 0; i < components.length; i++) {
                var object = components[i];
                if(object == this.dragData.dragObject) {
                    continue;
                }
                
                // Check for allow to drop
                if(Util.pointInBoundingBox(p, object.getRealBoundingBox())) {
                    if(object.acceptDrop(this.dragData.dragObject)) {
                        this.removeComponent(this.dragData.dragObject);
                        
                        object.removeDropHighlight();
                        this.dragData.dragObject = null;
                        this.dragData.dragParent = null;
                        
						this.redrawDirty(dirty);
						
						//this.getContext().putImageData(object.draw(), object.getX(), object.getY());
						
                        break;
                    }
                }
            }
            
            // If it was not accepted, return to parent
            if(this.dragData.dragObject) {
                this.removeComponent(this.dragData.dragObject);
				
				var d = this.dragData.dragParent;
                d.addComponent(this.dragData.dragObject);
                d.removeDropHighlight();
				//this.getContext().putImageData(d.draw(), d.getX(), d.getY());
				//draw topmost parent
				var parent = d;
				while(parent.getParent() != null) {
					parent = parent.getParent();
				}
				this.getContext().putImageData(parent.draw(), parent.getX(), parent.getY());
				
                this.dragData.dragObject = null;
                this.dragData.dragParent = null;
				
				this.redrawDirty(dirty);
            }
        }
        else {
            this.dragData.dragObject = null;
        }
    },
	
	init: function(canvasElement) {
		this._super();
		this.canvasElement = canvasElement;
		this.context = canvasElement.getContext('2d');
		
		this.setType('canvas');
		
		this.dragData = {
			draggables: [],
			dragPoint: null,
			dragObject: null,
			dragParent: null
		};
		
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
		
		this.getTiling().fill = 'none';
		this.getFrame().hidden = true;
		
		this.fixDimensions();
	}
});
