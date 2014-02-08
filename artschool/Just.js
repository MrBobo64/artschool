var Just = Component.extend({
	init: function(color) {
		this._super();
		this.color = color;
		
		this.setWidth(100);
		this.setHeight(40);
		
		ArtSchool.canvas.registerDraggable(this);
	},
	
	isDraggable: function() {
		return true;
	},
	
	canEscapeParent: function() {
		return true;
	},
	
	draw: function() {
		var context = this.getContext();
		
		context.fillStyle = this.color;
		context.fillRect(0, 0, this.getWidth(), this.getHeight());
		
		return context.getImageData(0, 0, this.getWidth(), this.getHeight());
	}
});
