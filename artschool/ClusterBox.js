/* ClusterBox extends Shape */

ClusterBox = function(x, y, color, depth) {
    this.x = x;
	this.y = y;
	this.color = color;
	this.depth = depth;
	
    this.width = 200;
    this.height = 120;

    this.isDraggable = true;
};

ClusterBox.prototype = Proto.clone(Shape.prototype);

ClusterBox.prototype.toString = function() {
    return 'ClusterBox (' + this.x + ', ' + this.y + '): ' + this.width + ' x ' + this.height;
};

ClusterBox.prototype.draw = function(context) {
	if(this.visible) {
		context.save();

		context.translate(this.x, this.y);
		context.fillStyle = this.color;
		context.fillRect(0, 0, this.width, this.height);

		context.restore();
	}
};
