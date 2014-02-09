var Arrangement = function(config) {
    this.width = config && config.width || -1;
	this.minWidth = config && config.minWidth || -1;
	this.maxWidth = config && config.maxWidth || -1;
	
	this.height = config && config.height || -1;
	this.minHeight = config && config.minHeight || -1;
	this.maxHeight = config && config.maxHeight || -1;
	
	this.flex = config && config.flex || 1;
};