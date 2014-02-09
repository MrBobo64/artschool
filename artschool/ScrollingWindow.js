// TODO: make this container and only allow one object?

var ScrollingWindow = Component.extend({	
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
		if(this.content) {
			this.content.removeWatcher(this);
		}
	
		this.content = contentComponent;
		contentComponent.setParent(this);
		contentComponent.addWatcher(this);
	},
	
	watchChanged: function(component) {
		if(component != this.content) {
			console.log("scrollwindow watching something not its content");
		}

		this.checkScrollbars();
	},
	
	drawScrollbars: function(context) {
		var hImage = this.hScrollbar.draw();
		var vImage = this.vScrollbar.draw();
		
		context.putImageData(hImage, this.hScrollbar.getX(), this.hScrollbar.getY());
		context.putImageData(vImage, this.vScrollbar.getX(), this.vScrollbar.getY());
	},
	
	draw: function() {
		//var context = this.getNewContext();
		//context.save();
		
		//context.lineWidth = 0;
		//context.rect(0, 0, this.getWidth(), this.getHeight());
		//context.stroke();
		//context.clip();
		console.log("SSSSSS: " + this.toString());
		this.getContent().draw();
		var portion = this.getContent().getContext().getImageData(this.scrollX, this.scrollY, this.getWidth(), this.getHeight());

		var context = this.getNewContext();
		context.putImageData(portion, 0, 0);
		
		// This could easily not work at all
		// Does putImageData have the concept of putting data outside the range
		// of the destination (aka ignore it)
		// use dirty if its an issue
		//context.putImageData(this.getContent().draw(), -this.scrollX, -this.scrollY);
		//context.putImageData(this.getContent().draw(), this.getContent().getX(), this.getContent().getY());
		// TODO: mabye manually place correct porion here!!!!
		
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
        return this.getContent().allowDrop(component);
    },

    acceptDrop: function(component) {
        return this.getContent().acceptDrop(component);
    },
	
	setDropHighlight: function() {
		this.getContent().setDropHighlight();
	},
	
	removeDropHighlight: function() {
		this.getContent().setDropHighlight();
	},
	
    checkScrollbars: function() {
		this.scrollVertical(this.vScrollbar.getY());// - this.vScrollbar.fatness);
		this.scrollHorizontal(this.hScrollbar.getX());
    },
	
	scrollVertical: function(y) {
		this.getContent().removeWatcher(this);
	
		var fullHeight = this.getContent().getHeight();
		
		// Adjust actually scrolling distance by what is blocked off by scrollbar itself
		// accounting also for margins
		var adjust = this.vScrollbar.getHeight();
		var scrollHeight = this.getHeight() - adjust;
		
		if(fullHeight > this.getHeight()) {
			this.scrollY = Math.round(y / scrollHeight * (fullHeight-scrollHeight-adjust));
		}
		else {
			this.scrollY = 0;
			//this.verticalScrollbar.visible = false;
		}
		
		
		// SIGNIFICANT
		this.getContent().setY(this.getY() - this.scrollY);
		
		//TODO: don't do this
		ArtSchool.canvas.redrawDirty(this.getRealBoundingBox());
		
		this.getContent().addWatcher(this);
    },
	
	scrollHorizontal: function(x) {
		this.getContent().removeWatcher(this);
	
		var fullWidth = this.getContent().getWidth();
		
		// Adjust actually scrolling distance by what is blocked off by scrollbar itself
		// accounting also for margins
		var adjust = this.hScrollbar.getWidth();
		var scrollWidth = this.getWidth() - adjust;
		
		if(fullWidth > this.getWidth()) {
			this.scrollX = Math.round(x / scrollWidth * (fullWidth-scrollWidth-adjust));
		}
		else {
			this.scrollX = 0;
			//this.horizontalScrollbar.visible = false;
		}
		
		this.getContent().setX(this.getX() - this.scrollX);
		
		//TODO: don't do this
		ArtSchool.canvas.redrawDirty(this.getRealBoundingBox());
		
		this.getContent().addWatcher(this);
	},
	
	init: function(contentComponent, config) {
		this._super(config && config.dimensions || null);
		
		this.scrollX = 0;
		this.scrollY = 0;
		
		this.hScrollbar = new Scrollbar(this, false);
	    this.vScrollbar = new Scrollbar(this, true);
		
		this.setType('scrollingwindow');
		
		this.content = contentComponent;
		contentComponent.setParent(this);
		contentComponent.addWatcher(this);
		
		this.frame = new Frame(config && config.frame || null);
	}
});
