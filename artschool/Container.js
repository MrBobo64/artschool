var Container = Component.extend({	
	getFrame: function() {
		return this.frame;
	},
	
	setFrame: function(frame) {
		this.frame = frame;
	},
	
	getComponents: function() {
		return this.components;
	},
	
    addComponent: function(component) {
        this.components.push(component);
        component.setParent(this);
    },

    removeComponentAtIndex: function(i) {
        this.components.splice(i, 1);
    },

    removeComponent: function(component) {
        for(var i = 0; i < this.components.length; i++) {
            if(component == this.components[i]) {
                this.components.splice(i, 1);
                break;
            }
        }
    },

    isContainer: function() {
        return true;
    },
	
    allowDrop: function(component) {
        return false;
    },
        
    acceptDrop: function(component) {
        return false;
    },
	
	draw: function() {
		console.log("drawing " + this.toString());
	
		var components = this.getComponents();
		var context = this.getContext();
		
		for(var i = 0; i < components.length; i++) {
			var c = components[i];
			var image = c.draw();
			
			context.putImageData(image, c.getX(), c.getY());
		}
		
		if(this.frame && !this.frame.hidden) {
			context.lineStyle = this.frame.color;
			context.lineWidth = this.frame.thickness;
			context.rect(0, 0, this.getWidth(), this.getHeight());
			context.stroke();
		}
		
		return context.getImageData(0, 0, this.getWidth(), this.getHeight());
	},
	
	isDropHighlighted: function() {
		return dropHighlighted;
	},
	
	setDropHighlight: function() {
		this.dropHighlighted = true;
	},
	
	removeDropHighlight: function() {
		this.dropHighlighted = false;
	},
	
	// init
	init: function(config) {
		this._super(config && config.dimensions || null);
		this.setType('container');
		this.components = [];
		
		this.dropHighlighted = false;
		
		this.arrangement = new Arrangement(config && config.arrangement || null);
		this.frame = new Frame(config && config.frame || null);
		
		if(config && config.components) {
			for(var i = 0; i < config.components.length; i++) {
				this.addComponent(config.components[i]);
			}
		}
	}
});
