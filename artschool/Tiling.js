var Tiling = function(config) {
	// margin is distance from the wall
	this.margin = config && config.margin || 10;
	
	// spacing is between elements
	this.spacing = config && config.spacing || 10;
	
	// justify can be
	//  for vertical
	//   - left
	//   - right
	//  for horizontal
	//   - top
	//   - bottom
	this.justify = config && config.justify || 'left';
	
	// tiling can be
	//  - vertical
	//  - horizontal
	//  - free
	this.tiling = config && config.tiling || 'vertical';
	
	// stretch can be
	//  - none
	//  - full
	//  - max
	this.stretch = config && config.stretch || 'none';
	
	// fill can be
	//  - none
	//  - flex
	this.fill = config && config.fill || 'none';
}