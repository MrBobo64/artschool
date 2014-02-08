
function Box(x, y, width, height) {
    this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.toString = function() {
		return "" + this.x + " " + this.y + " " + this.width + " " + this.height;
	}
}