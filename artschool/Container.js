/* Container extends Component */
function Container() {
    Component.call(this);
    //console.log("Container constructor");
    
	this.type = 'container';
    this.components = [];
    
    this.getComponents = function() {
        return this.components;
    };

    this.addComponent = function(component) {
        //console.log(this.getComponents());
        this.components.push(component);
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

    this.draw = function(canvas) {
        for(var i = 0; i < this.components.length; i++) {
            this.components[i].draw(canvas);
        }
    };

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
    
    this.prototype = new Component();
    this.prototype.constructor = Container;
}