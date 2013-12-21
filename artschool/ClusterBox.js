/*
 * ClusterBox implements Shape
 */
function ClusterBox(x, y, color, depth) {
    var self = this;

    this.draw = function(context) {
        context.save();

        context.translate(self.x, self.y);
        context.fillStyle = self.color;
        context.fillRect(0, 0, self.width, self.height);

        context.restore();
    };

    this.getBoundingBox = function() {
        var box = new Object();
        box.x = self.x;
        box.y = self.y;
        box.width = self.width;
        box.height= self.height;
        
        return box;
    };
    
    this.drag = function(newPoint, oldPoint) {
        self.dragObject.x += p.x - self.dragPoint.x;
        self.dragObject.y += p.y - self.dragPoint.y;
    };

    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 120;
    this.color = color;
    this.depth = depth;

    this.isDraggable = true;
}