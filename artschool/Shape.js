/* Shape extends Component */
Shape = function() {
	this.type = 'shape';
};
Shape.prototype = Proto.clone(Component.prototype);
