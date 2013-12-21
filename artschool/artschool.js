
/*
 * Main, as it were
 */
var canvas = new Canvas(document.getElementById('d'));

var c = new ClusterBox(10, 20, '#22FF22', 0);

canvas.objects.push(c);
canvas.draw();