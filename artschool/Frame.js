var Frame = function(config) {
	this.hidden = config && config.hidden || false;
	this.color = config && config.color || '#000000';
	this.thickness = config && config.thickness || 1;
}