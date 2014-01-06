/* Container extends Component */
function Container() {
    //this.prototype = new Component();
    //this.prototype.constructor = Container;
    
    Component.call(this);
    //console.log("Container constructor");
    
	this.type = 'container';
    this.components = [];
	this.arrangement = new Arrangement();
    
    this.getComponents = function() {
        return this.components;
    };

    this.addComponent = function(component) {
        //console.log(this.getComponents());
        this.components.push(component);
        component.parent = this;
    };

    this.removeComponentAtIndex = function(i) {
        this.components.splice(i, 1);
    };

    this.removeComponent = function(component) {
        for(var i = 0; i < this.components.length; i++) {
            if(component == this.components[i]) {
                this.components.splice(i, 1);
                break;
            }
        }
    };

    this.isContainer = function() {
        return true;
    };

    this.draw = function(canvas, translation) {
		if(!translation) {
			translation = {x:0, y:0};
		}
		
		if(this.arrangement.tiling == 'horizontal') {
			this.drawHorizontal(canvas, translation);
		}
		else if(this.arrangement.tiling == 'vertical') {
			this.drawVertical(canvas, translation);
		}
		else {
			this.drawFree(canvas);
		}
    };
	
	this.drawFree = function(canvas) {
		for(var i = 0; i < this.components.length; i++) {
            this.components[i].draw(canvas);
        }
	};

	this.drawVertical = function(canvas, translation) {
		if(this.arrangement.justify == 'left') {
			translation.x += this.arrangement.margin;
		}
		else if(this.arrangement.justify == 'right') {
			translation.x += this.width - this.arrangement.margin;
		}
		
		this.setWidth = -1;
		if(this.arrangement.stretch == 'max') {
			for(var i = 0; i < this.components.length; i++) {
				var object = this.components[i];
				if(object.width > this.setWidth) {
					this.setWidth = object.width;
				}
			}
		}
		else if(this.arrangement.stretch == 'full') {
			this.setWidth = this.width - 2 * this.arrangement.margin;
		}
		
		for(var i = 0; i < this.components.length; i++) {
			var object = this.components[i];
			
			translation.y += this.arrangement.spacing;
			if(this.arrangement.justify == 'right') {
				object.x = translation.x - object.width;
			}
			else {
				object.x = translation.x;
			}
			object.y = translation.y;
			
			if(this.setWidth > 0) {
				object.stretchTo(this.setWidth, object.height);
			}
			
			var box = object.getRealBoundingBox();
			if(Util.boxesIntersect(box, this.getRealBoundingBox())) {
				object.draw(canvas);
			}
			
			translation.y += object.height;
		}
	};
	
	this.drawHorizontal = function(canvas, translation) {
		if(this.arrangement.justify == 'top') {
			translation.y += this.arrangement.margin;
		}
		else if(this.arrangement.justify == 'bottom') {
			translation.y += this.height - this.arrangement.margin;
		}
		
		for(var i = 0; i < this.components.length; i++) {
			var object = this.components[i];
			
			translation.x += this.arrangement.spacing;
			object.x = translation.x;
			if(this.arrangement.justify == 'bottom') {
				object.y = translation.y - object.height;
			}
			else {
				object.y = translation.y;
			}
			
			var box = object.getRealBoundingBox();
			if(Util.boxesIntersect(box, this.getRealBoundingBox())) {
				object.draw(canvas);
			}
			
			translation.x += object.width;
		}
	}
	
    this.allowDrop = function(component) {
        return false;
    };
        
    this.acceptDrop = function(component) {
        return false;
    };
        
    this.setDropHighlight = function(canvas) {
        console.error("Cannot set drop highlight on " + this.type);
    };

    this.removeDropHighlight = function(canvas) {
        console.error("Cannot remove drop highlight on " + this.type);
    };
}