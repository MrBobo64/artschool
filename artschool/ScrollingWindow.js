var ScrollingWindow = Component.extend({
	init: function(drawFrame, contentComponent) {
		this._super();
		
		this.scrollX = 0;
		this.scrollY = 0;
		
		this.hScrollbar = new Scrollbar(this, false);
	    this.vScrollbar = new Scrollbar(this, true);
		
		this.setType('scrollingwindow');
		
		this.content = contentComponent;
		
		this.drawFrame = drawFrame;
	},
	
	adjustScrollbars: function() {
		this.hScrollbar.setY(this.getHeight() - this.hScrollbar.getHeight());
		this.vScrollbar.setX(this.getWidth() - this.vScrollbar.getWidth());
	},
	
	setWidth: function(width) {
		this._super(width);
		
		this.adjustScrollbars();
	},
	
	setHeight: function(height) {
		this._super(height);
		
		this.adjustScrollbars();
	},
	
	getContent: function() {
		return this.content;
	},
	
	setContent: function(contentComponent) {
		this.content = contentComponent;
	},
	
	drawScrollbars: function(context) {
		var hImage = this.hScrollbar.draw();
		var vImage = this.vScrollbar.draw();
		
		context.putImageData(hImage, this.hScrollbar.getX(), this.hScrollbar.getY());
		context.putImageData(vImage, this.vScrollbar.getX(), this.vScrollbar.getY());
	},
	
	draw: function() {
		var context = this.getContext();
		context.save();
		
		context.lineWidth = 0;
		context.rect(0, 0, this.getWidth(), this.getHeight());
		context.stroke();
		context.clip();
		
		// This could easily not work at all
		// Does putImageData have the concept of putting data outside the range
		// of the destination (aka ignore it)
		// use dirty if its an issue
		context.putImageData(this.getContent().draw(), -scrollX, -scrollY);
		
		this.drawScrollbars(context);
		
		context.restore();
		
		if(this.drawFrame) {
			context.lineWidth = 1;
			//if(this.isDropHighlighted()) {
			//	context.strokeStyle = '#FFDD50';
			//}
			//else {
				context.strokeStyle = '#000000';
			//}
			context.rect(0, 0, this.getWidth(), this.getHeight());
			context.stroke();
		}
		
		return context.getImageData(0, 0, this.getWidth(), this.getHeight());
	},
	
	allowDrop: function(component) {
        return false;
    },

    acceptDrop: function(component) {
        this.setContent(component);
        this.checkScrollbars();
        
        return true;
    },

    checkScrollbars: function() {
		this.scrollVertical(this.vScrollbar.getY());// - this.vScrollbar.fatness);
		this.scrollHorizontal(this.hScrollbar.getX());
    },
	
	scrollVertical: function(y) {
		// GET CAN THIS INFO AN ALL ADD/REMOVE instead of recalculating
		var fullHeight = this.getContent().getHeight();
		
		// Adjust actually scrolling distance by what is blocked off by scrollbar itself
		// accounting also for margins
		var adjust = this.vScrollbar.getHeight();
		var scrollHeight = this.getHeight() - adjust;
		
		if(fullHeight > this.getHeight()) {
			this.scrollY = y / scrollHeight * (fullHeight-scrollHeight-adjust);
		}
		else {
			this.scrollY = 0;
			//this.verticalScrollbar.visible = false;
		}
    },
	
	scrollHorizontal: function(x) {
		// GET CAN THIS INFO AN ALL ADD/REMOVE instead of recalculating
		var fullWidth = this.getContent().getWidth();
		
		// Adjust actually scrolling distance by what is blocked off by scrollbar itself
		// accounting also for margins
		var adjust = this.hScrollbar.getWidth();
		var scrollWidth = this.getWidth() - adjust;
		
		if(fullWidth > this.getWidth()) {
			this.scrollX = x / scrollWidth * (fullWidth-scrollWidth-adjust);
		}
		else {
			this.scrollX = 0;
			//this.horizontalScrollbar.visible = false;
		}
	}
});
