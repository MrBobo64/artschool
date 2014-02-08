var Scrollbar = Component.extend({
	init: function(scrollingWindow, vertical) {
		this._super();
		
		this.scrollingWindow = scrollingWindow;
		this.vertical = vertical;
		
		this.length = 30;
		this.fatness = 8;
		
		if(vertical) {
			this.setWidth(this.fatness);
			this.setHeight(this.length);
		}
		else {
			this.setWidth(this.length);
			this.setHeight(this.fatness);
		}
		
		this.setType('scrollbar' + (this.vertical ? '(v)' : '(h)'));
		
		ArtSchool.canvas.registerDraggable(this);
	},
	
	isDraggable: function() {
		return true;
	},
	
	canEscapeParent: function() {
		return false;
	},
	
	draw: function() {
		if(!this.cachedImage) {
			var context = this.getContext();
			context.clearRect(0, 0, this.getWidth(), this.getHeight());
			context.rect(0, 0, this.getWidth(), this.getHeight());
			context.stroke();
			
			this.cachedImage = context.getImageData(0, 0, this.getWidth(), this.getHeight());
		}
		
		return this.cachedImage;
	},
	
	drag: function(dx, dy) {
        if(this.vertical) {
            this.setY(this.getY() + dy);
            if(this.getY() < 0) {
                this.setY(0);
            }
            if(this.getY() > this.scrollingWindow.getHeight() - this.getHeight()) {
                this.setY(this.scrollingWindow.getHeight() - this.getHeight);
            }
            
            this.scrollingWindow.scrollVertical(this.getY());
        }
        else {
            this.setX(this.getX() + dx);
            if(this.getX() < 0) {
                this.setX(0);
            }
            if(this.getX() > this.scrollingWindow.getWidth() - this.getWidth()) {
                this.setX(this.scrollingWindow.getWidth() - this.getWidth());
            }
            
            this.scrollingWindow.scrollHorizontal(this.getX());
        }
    }
});