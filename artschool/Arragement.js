Arragement = new Object();
Arragement.prototype = {
    // margin is distance from the wall
	margin: 10,
	// spacing is between elements
	spacing: 10,
	// justification can be
	//  for vertical
	//   - left
	//   - right
	//  for horizontal
	//   - top
	//   - bottom
	justification: 'left',
	// tiling can be
	//  - vertical
	//  - horizontal
	//  - free
	tiling: 'vertical',
	// stretch can be
	//  - none
	//  - full
	//  - max
	stretch: 'none'
};