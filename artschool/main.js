
var canvas = new Canvas(document.getElementById('d'));
ArtSchool.canvas = canvas;

var D_THICK = 1;

var panel = new Panel({
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

//panel.setWidth(200);
//panel.setHeight(200);

panel.addComponent(new Just('#22FF22'));
panel.addComponent(new Just('#22DD22'));
panel.addComponent(new Just('#22BB22'));
panel.addComponent(new Just('#22AA22'));
panel.addComponent(new Just('#229922'));
panel.addComponent(new Just('#228822'));

var s = new ScrollingWindow(panel, {
	tiling: {
		fill: 'flex',
		margin: 0,
		spacing: 0
	},
	
	frame: {
		color: '#0000FF',
		thickness: D_THICK
	}
});
s.setWidth(200);
s.setHeight(200);

canvas.addComponent(s);

canvas.drawCanvas();