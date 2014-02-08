
/*
 * Main, as it were
 */

ArtSchool = function() {
	this.canvas = null;
};

var canvas = new Canvas(document.getElementById('d'));

ArtSchool.canvas = canvas;

var c = new Just('#22FF22');
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

canvas.addComponent(s);

canvas.drawCanvas();
