var Scrollbar = Component.extend({
	
	isDraggable: function() {
		return true;
	},
	
	canEscapeParent: function() {
		return false;
	},
	
	draw: function() {
		/*if(!this.cachedImage) {
			var context = this.getContext();
			context.clearRect(0, 0, this.getWidth(), this.getHeight());
			context.rect(0, 0, this.getWidth(), this.getHeight());
			context.stroke();
			
			this.cachedImage = context.getImageData(0, 0, this.getWidth(), this.getHeight());
		}
		
		return this.cachedImage;*/
        
        if(!this.rect) {
            var paper = this.getNewSnap();
            var rect = paper.rect(0, 0, this.getWidth(), this.getHeight());
            rect.attr({
                fill: '#FFFFFF',
                stroke: '#000000',
                strokeWidth: 0.5
            });
            
            rect.drag(this.drag, this.dragStart, this.dragEnd, this);
            
            this.rect = rect;
        }
        
        return this.rect;
	},
	
    dragStart: function(x, y, event) {
        this.ndx = x;
        this.ndy = y;
    },
    
    dragEnd: function(event) {
    
    },
    
	drag: function(dx, dy, x, y, ie) {
        dx = x - this.ndx;
        dy = y - this.ndy;
    
        this.ndx = x;
        this.ndy = y;
    
        if(this.vertical) {
            this.setY(this.getY() + dy);
            if(this.getY() < 0) {
                this.setY(0);
            }
            if(this.getY() > this.scrollingWindow.getHeight() - this.getHeight()) {
                this.setY(this.scrollingWindow.getHeight() - this.getHeight());
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
        
        this.rect.attr({
            x: this.getX(),
            y: this.getY()
        });
    },
	
	// init
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
		
		//ArtSchool.canvas.registerDraggable(this);
	}
});