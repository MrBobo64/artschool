
var canvas = new Canvas(document.getElementById('d'));
ArtSchool.canvas = canvas;

var D_THICK = 10;

///////////////////////////////////////
// TOP
///////////////////////////////////////
var clusterPanel = new Panel({
	tiling: {
		tiling: 'vertical',
		fill: 'none',
		stretch: 'full',
		spacing: 10,
		margin: 10
	},
	
	frame: {
		color: '#FF0000',
		thickness: D_THICK
	}
});
var hostPanel = new Panel({
	tiling: {
		tiling: 'vertical',
		fill: 'none',
		stretch: 'full',
		spacing: 10,
		margin: 10
	},
	
	frame: {
		color: '#00FF00',
		thickness: D_THICK
	}
});
var targetPanel = new Panel({
	tiling: {
		tiling: 'vertical',
		fill: 'none',
		stretch: 'full',
		spacing: 10,
		margin: 10
	},
	
	frame: {
		color: '#0000FF',
		thickness: D_THICK
	}
});

var topPanel = new Panel({
	tiling: {
		tiling: 'horizontal',
		fill: 'flex',
		spacing: 0,
		margin: 0,
		stretch: 'full'
	},
	
	frame: {
		color: '#FFFF00',
		thickness: D_THICK
	},
	
	arrangement: {
		flex: 3
	},
	
	dimensions: {
		x: 0,
		y: 0,
		width: canvas.getWidth(),
		height: canvas.getHeight()
	},
	
	/*components: [
		new ScrollingWindow(clusterPanel),
		new ScrollingWindow(hostPanel),
		new ScrollingWindow(targetPanel)
	]*/
	
	components: [
		new ScrollingWindow(clusterPanel, {frame:{hidden:true}}),
		hostPanel,
		targetPanel
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
	],
	
	frame: {
		color: '#00FFFF',
		thickness: D_THICK
	}
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
	],
	
	frame: {
		color: '#FF00FF',
		thickness: D_THICK
	}
});

//canvas.addComponent(mainPanel);
canvas.addComponent(topPanel);

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
