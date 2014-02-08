var Just = Component.extend({
	init: function(color) {
		this._super();
		this.color = color;
		
		this.setWidth(100);
		this.setHeight(40);
	},
	
	draw: function() {
		var context = this.getContext();
		
		context.fillStyle = this.color;
		context.fillRect(0, 0, this.getWidth(), this.getHeight());
		
		return context.getImageData(0, 0, this.getWidth(), this.getHeight());
	}
});
