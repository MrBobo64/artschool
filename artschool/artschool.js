
/*
 * Main, as it were
 */

var canvas = new Canvas(document.getElementById('d'));

var c = new ClusterBox(10, 20, '#22FF22', 0);
var s = new ScrollingWindow(20, 40, 200, 200, 200, 200, false, true);

//canvas.objects.push(c);
canvas.objects.push(s);
canvas.draw();
