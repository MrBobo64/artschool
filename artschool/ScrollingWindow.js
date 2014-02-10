// TODO: make this container and only allow one object?

var ScrollingWindow = Container.extend({	
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
		return this.getComponents()[0];
	},
	
	addComponent: function(component) {
		var content = this.getComponents();
		
		while(this.getComponents().length > 0) {
			this.removeComponentAtIndex(0);
		}
		
		this._super(component);
		component.addWatcher(this);
	},
	
	watchChanged: function(component) {
		if(component != this.getComponents()[0]) {
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
		this._super();
	
		var content = this.getComponents()[0];
		content.draw();
		var portion = content.getContext().getImageData(this.scrollX, this.scrollY, this.getWidth(), this.getHeight());

		var context = this.getNewContext();
		context.putImageData(portion, 0, 0);
		
		this.drawScrollbars(context);
		
		context.restore();
		
		this.drawFrame();
		
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
	
	/*setWidth: function(width) {
		this._super(width);
		
		var content = this.getContent();
		if(content && this.getTiling().fill == 'flex') {
			content.setWidth(width);
		}
	},
	
	setHeight: function(height) {
		this._super(height);
		
		var content = this.getContent();
		if(content && this.getTiling().fill == 'flex') {
			content.setHeight(height);
		}
	},*/
	
	init: function(content, config) {
		this._super(config);
		
		this.scrollX = 0;
		this.scrollY = 0;
		
		this.hScrollbar = new Scrollbar(this, false);
	    this.vScrollbar = new Scrollbar(this, true);
		
		this.setType('scrollingwindow');
		
		this.addComponent(content);
	}
});
