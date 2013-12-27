/* Container extends Component */
Container = function() {
	this.type = 'container';
};
Container.prototype = Proto.clone(Component.prototype);

Container.prototype.components = [];
//Container.prototype.type = 'container';

Container.prototype.getComponents = function() {
    //if(this.components.length === undefined) {
    //    this.components = [];
    //}
	return this.components;
};

Container.prototype.addComponent = function(component) {
    //console.log(this.getComponents());
	this.getComponents().push(component);
};

Container.prototype.removeComponentAtIndex = function(i) {
	this.components.splice(i, 1);
};

Container.prototype.removeComponent = function(component) {
	for(var i = 0; i < this.components.length; i++) {
		if(component == this.components[i]) {
			this.components.splice(i, 1);
			break;
		}
	}
};

Container.prototype.isContainer = function() {
	return true;
};

Container.prototype.draw = function(canvas) {
	for(var i = 0; i < components.length; i++) {
		components[i].draw(canvas);
	}
};

Container.prototype.allowDrop = function(component) {
	return false;
};
	
Container.prototype.acceptDrop = function(component) {
	return false;
};
	
Container.prototype.setDropHighlight = function(canvas) {
	console.error("Cannot set drop highlight on " + this.type);
};

Container.prototype.removeDropHighlight = function(canvas) {
	console.error("Cannot remove drop highlight on " + this.type);
};