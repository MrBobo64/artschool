var ClusterBox = Component.extend({
	
	drawBackground: function(context) {
        var blockWidth = 10;
        var blockHeight = 10;

        var blockRows = Math.floor(this.getWidth() / blockWidth);
        var blockColumns = Math.floor(this.getHeight() / blockHeight);
        
        for(var i = 0; i < blockColumns; i++) {
            for(var j = 0; j < blockRows; j++) {
                var red = -10 + (i*blockWidth) + Math.floor(255/blockRows * j);
                var green = -10 + (i*blockWidth) + 99 + Math.floor((255-99)/blockRows * j);
                var blue = 255;
                
                context.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                context.fillRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
            }
        }
        
        //if(this.selected) {
        //    context.fillStyle = 'rgb(0, 0, 0, 0.1)';
        //    context.fillRect(0, 0, this.width, this.height);
        //}
        
        var nudge = 1;
        
        context.beginPath();
        context.lineWidth = 1;
        context.lineJoin = 'miter';
        context.miterLimit = 100;
        context.moveTo(nudge, this.height - nudge);
        context.lineTo(this.width - nudge, this.height - nudge);
        context.lineTo(this.width - nudge, nudge);
        context.strokeStyle = '#222222';
        context.stroke();
    },
	
    draw: function(canvas) {
		var context = this.getContext();
		
        //if(this.visible) {
            context.save();
			context.rect(0, 0, this.getWidth(), this.getHeight());
			context.clip();
            this.drawBackground(context);

            context.restore();
        //}
		
		return context.getImageData(0, 0, this.getWidth(), this.getHeight());
    },
	
	// init
	init: function(width, height) {
		this._super();
		
		this.setWidth(width);
		this.setHeight(height);
	}
});
