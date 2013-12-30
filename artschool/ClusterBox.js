/* ClusterBox extends Shape */
function ClusterBox(x, y, color, depth) {
    Shape.call(this);
    //console.log("ClusterBox Constructor");

    this.x = x;
	this.y = y;
	this.color = color;
	this.depth = depth;
	
    this.width = 200;
    this.height = 120;

    this.draggable = true;
    
    this.type = 'clusterbox';

    this.drawBackground = function(context) {
        var blockWidth = 10;
        var blockHeight = 10;

        var blockRows = Math.floor(this.width / blockWidth);
        var blockColumns = Math.floor(this.height / blockHeight);
               
        for(var i = 0; i < blockColumns; i++) {
            for(var j = 0; j < blockRows; j++) {
                var red = -10 + (i*blockWidth) + Math.floor(255/blockRows * j);
                var green = -10 + (i*blockWidth) + 99 + Math.floor((255-99)/blockRows * j);
                var blue = 255;
                
                context.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                context.fillRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
            }
        }
                               
        if(this.selected) {
            context.fillStyle = 'rgb(0, 0, 0, 0.1)';
            context.fillRect(0, 0, this.width, this.height);
        }
        
        var nudge = 1;
        
        context.beginPath();
        context.lineWidth = 1;
        context.lineJoin = 'miter';
        context.miterLimit = 100;
        context.moveTo(nudge, this.height - nudge);
        context.lineTo(this.width - nudge, this.height - nudge);
        context.lineTo(this.width - nudge, nudge);
        context.strokeStyle = '#222222';
        context.stroke();
    };

    this.draw = function(canvas) {
        if(this.visible) {
            var context = canvas.getContext();
        
            context.save();

            context.translate(this.x, this.y);        
            this.drawBackground(context);

            context.restore();
        }
    };
    
    this.prototype = new Shape();
    this.prototype.constructor = ClusterBox;
}