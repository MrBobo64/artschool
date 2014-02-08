function Tiling() {
	// margin is distance from the wall
	this.margin = 10;
	
	// spacing is between elements
	this.spacing = 10;
	
	// justify can be
	//  for vertical
	//   - left
	//   - right
	//  for horizontal
	//   - top
	//   - bottom
	this.justify = 'left';
	
	// tiling can be
	//  - vertical
	//  - horizontal
	//  - free
	this.tiling = 'vertical';
	
	// stretch can be
	//  - none
	//  - full
	//  - max
	this.stretch = 'none';
	
	// fill can be
	//  - none
	//  - flex
	this.fill = 'none';
}