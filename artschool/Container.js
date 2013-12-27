Container = new Object();
Container.prototype = Proto.clone(Component.prototype);

Container.prototype.addObject: function(object) {

};

Container.prototype.removeObject: function(object) {

};

Container.prototype.allowDrop: function(object) {
	return false;
};
	
Container.prototype.acceptDrop: function(object) {
	return false;
};
	
Container.prototype.setDropHighlight: function(context) {
	
};

Container.prototype.removeDropHighlight: function(context) {

};