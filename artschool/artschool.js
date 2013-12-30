
/*
 * Main, as it were
 */

/*var component = new Component();
var container = new Container();

console.log(component.toString());
console.log(container.toString());

container.addComponent(component);*/

var canvas = new Canvas(document.getElementById('d'));

var c = new ClusterBox(0, 0, '#22FF22', 0);
var d = new ClusterBox(0, 0, '#22DD22', 0);
var e = new ClusterBox(0, 0, '#22BB22', 0);
var f = new ClusterBox(0, 0, '#229922', 0);
var g = new ClusterBox(0, 0, '#229922', 0);
var h = new ClusterBox(0, 0, '#229922', 0);

console.log(c.toString());

var s = new ScrollingWindow(40, 40, 400, 430, false, true);
s.addComponent(c);
s.addComponent(d);
s.addComponent(e);
s.addComponent(f);
s.addComponent(g);
s.addComponent(h);

console.log(s.toString());

var t = new ScrollingWindow(460, 40, 400, 430, false, true);
t.shout = true;

canvas.addComponent(s);
canvas.addComponent(t);
canvas.drawCanvas();
