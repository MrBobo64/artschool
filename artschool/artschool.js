
/*
 * Main, as it were
 */


ArtSchool = function() {
	this.canvas = null;
};

var canvas = new Canvas(document.getElementById('d'));

ArtSchool.canvas = canvas;

///////////////////////////////////////
// TOP
///////////////////////////////////////
var clusterPanel = new Panel();
var hostPanel = new Panel();
var targetPanel = new Panel();

var topPanel = new Panel({
	tiling: {
		tiling: "horizontal",
		fill: "flex",
		spacing: 0,
		margin: 0,
		stretch: "full"
	},
	
	frame: {
		hidden: false,
		color: "blue",
		thickness: 2
	},
	
	arrangement: {
		flex: 3
	},
	
	components: [
		clusterPanel,
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
	]
});

var mainPanel = new Panel({
	tiling: {
		spacing: 0,
		stretch: "full",
		fill: "flex"
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
var h = new Just('#228822');

var t = new Tiling();
var panel = new Panel(t);
panel.setWidth(400);
panel.setHeight(400);

panel.addComponent(c);
panel.addComponent(d);
panel.addComponent(e);
panel.addComponent(f);
panel.addComponent(g);
panel.addComponent(h);

//canvas.addComponent(panel);

//var c = new ClusterBox(400, 400);

var s = new ScrollingWindow(true, panel);
s.setWidth(200);
s.setHeight(200);

panel.setWidth(s.getWidth());

canvas.addComponent(s);*/

canvas.drawCanvas();
