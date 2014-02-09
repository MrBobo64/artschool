
/*
 * Main, as it were
 */

 
//THOUGHTS: Canvas can extend Panel instead.
// Canvas and ScrollingWindow can override addComponent to
// only allow one component at a time.  That was ScrollingWindow
// is still a container, and Canvas can have layouts.
// Create BorderedContainer (NWSE, center)

ArtSchool = function() {
	this.canvas = null;
};

var canvas = new Canvas(document.getElementById('d'));

ArtSchool.canvas = canvas;

///////////////////////////////////////
// TOP
///////////////////////////////////////
var clusterPanel = new Panel({
	tiling: {
		tiling: 'vertical',
		fill: 'flex',
		stretch: 'full',
		spacing: 10,
		margin: 10
	}
});

var hostPanel = new Panel();
var targetPanel = new Panel();

var topPanel = new Panel({
	tiling: {
		tiling: 'horizontal',
		fill: 'flex',
		spacing: 0,
		margin: 0,
		stretch: 'full'
	},
	
	frame: {
		color: '#0000FF',
		thickness: 2
	},
	
	arrangement: {
		flex: 3
	},
	
	components: [
		new ScrollingWindow(clusterPanel),
		new ScrollingWindow(hostPanel),
		new ScrollingWindow(targetPanel)
	]
});

/////////////////////////////////////////
// BOTTOM
/////////////////////////////////////////
var previewPanel = new Panel();
var messagePanel = new Panel();

var bottomPanel = new Panel({
	tiling: {
		tiling: 'vertical',
		fill: 'flex',
		spacing: 0,
		margin: 0,
		stretch: 'full'
	},
	
	arrangement: {
		flex: 2
	},
	
	components: [
		previewPanel,
		messagePanel
	]
});

var mainPanel = new Panel({
	tiling: {
		spacing: 0,
		tiling: 'vertical',
		stretch: 'full',
		fill: 'flex'
	},
	
	dimensions: {
		x: 0,
		y: 0,
		width: canvas.getWidth(),
		height: canvas.getHeight()
	},
	
	components: [
		topPanel,
		bottomPanel
	]
});

canvas.addComponent(mainPanel);

/*var c = new Just('#22FF22');
var d = new Just('#22DD22');
var e = new Just('#22BB22');
var f = new Just('#22AA22');
var g = new Just('#229922');
var h = new Just('#228822');*/

clusterPanel.addComponent(new Just('#22FF22'));
clusterPanel.addComponent(new Just('#22DD22'));
clusterPanel.addComponent(new Just('#22BB22'));
clusterPanel.addComponent(new Just('#22AA22'));
clusterPanel.addComponent(new Just('#229922'));
clusterPanel.addComponent(new Just('#228822'));

canvas.drawCanvas();

//console.log(clusterPanel);
//console.log(hostPanel);
//console.log(targetPanel);
