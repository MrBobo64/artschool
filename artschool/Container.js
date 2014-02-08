var Container = Component.extend({
	init: function() {
		this._super();
		this.setType('container');
		this.components = [];
		this.arrangement = new Arrangement();
		
		this.dropHighlighted = false;
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
		var components = this.getComponents();
		var context = this.getContext();
		
		for(var i = 0; i < components.length; i++) {
			var c = components[i];
			var image = c.draw();
			
			context.putImageData(image, c.getX(), c.getY());
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
	}
});
