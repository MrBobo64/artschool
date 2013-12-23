
/*
 * Main, as it were
 */

var canvas = new Canvas(document.getElementById('d'));

var c = new ClusterBox(0, 0, '#22FF22', 0);
var d = new ClusterBox(0, 0, '#22DD22', 0);
var e = new ClusterBox(0, 0, '#22BB22', 0);
var f = new ClusterBox(0, 0, '#229922', 0);

var s = new ScrollingWindow(40, 40, 400, 430, false, true);
s.addObject(c);
s.addObject(d);
s.addObject(e);
s.addObject(f);

var t = new ScrollingWindow(460, 40, 400, 430, false, true);

canvas.objects.push(s);
canvas.objects.push(t);
canvas.draw();
