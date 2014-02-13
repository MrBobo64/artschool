var Just = Rectangle.extend({
	init: function(color) {
		this._super({
            dimensions: {
                width: 100,
                height: 40
            },
            style: {
                fill: color
            }
        });
		//this.color = color;
		
		//this.setWidth(100);
		//this.setHeight(40);
		
		//ArtSchool.canvas.registerDraggable(this);
        
        
	},
	
	isDraggable: function() {
		return true;
	},
	
	canEscapeParent: function() {
		return true;
	},
	
	/*draw: function() {
        var context = this.getContext();
		
		context.fillStyle = this.color;
		context.fillRect(0, 0, this.getWidth(), this.getHeight());
		
		return context.getImageData(0, 0, this.getWidth(), this.getHeight());
	}*/
    
    /*draw: function() {
        if(!this.shape) {
            this.shape = new Rectangle(this.getX(),
                                       this.getY(),
                                       this.getWidth(),
                                       this.getHeight(),
                                       {
                                           fill: this.color,
                                           stroke: 'none'
                                       });
            this.addShape(this.shape);
        }
        
        // Shapes need chuhrn
        // Add child, takes more shapes
    }*/
});
