
/* 
 * Canvas
 */
function Canvas(canvasElement) {
    var self = this;

	// Finds point within the canvas
    this.getPointFromMouse = function(e) {
        var x;
        var y;

        if (e.pageX != undefined && e.pageY != undefined) {
            x = e.pageX;
            y = e.pageY;
        }
        else {
            x = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
        }

        x -= self.canvasElement.offsetLeft;
        y -= self.canvasElement.offsetTop;

        var p = new Object();
        p.x = x;
        p.y = y;

        return p;
    };

    this.draw = function() {
        for(var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
            object.draw(self.context);
        }
    };

    this.drag = function(mouseEvent) {
        var box = self.dragObject.getBoundingBox();
        self.context.clearRect(box.x, box.y, box.width, box.height);

        var p = self.getPointFromMouse(mouseEvent);

        self.dragObject.x += p.x - self.dragPoint.x;
        self.dragObject.y += p.y - self.dragPoint.y;

        self.dragPoint = p;
            
        self.dragObject.draw(self.context);
    };

    this.onMouseDown = function(mouseEvent) {
        var p = self.getPointFromMouse(mouseEvent);
        for(var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
            var box = object.getBoundingBox();

            if(pointInBoundingBox(p, box)) {
               self.dragPoint = p;
               self.dragObject = object;
               break;
            }
        }
    };

    this.onMouseMove = function(mouseEvent) {
        if(self.dragObject != null) {
            self.drag(mouseEvent);
        }
    };

    this.onMouseUp = function(mouseEvent) {
        self.dragObject = null;
    };

    this.canvasElement = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.objects = new Array();
    this.dragPoint = null;
    this.dragObject = null;

    this.canvasElement.onmousedown = this.onMouseDown;
    this.canvasElement.onmousemove = this.onMouseMove;
    this.canvasElement.onmouseup = this.onMouseUp;
}

/*
 * Shape
 *  - x
 *  - y
 *  - width
 *  - height
 *  - getBoundingBox:box
 *  - isDraggable
 *  - draw
 */

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

    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 120;
    this.color = color;
    this.depth = depth;

    this.isDraggable = true;
}

/*
 * pointInBoundingBox
 *   - True if a point is within a bounding box
 */
function pointInBoundingBox(p, box) {
    if(p.x >= box.x && p.x <= box.x + box.width) {
        if(p.y >= box.y && p.y <= box.y + box.height) {
            return true;
        }
    }

    return false;
}

/*
 * boxesIntersect
 *  - True if two boxes intersect
 */
function boxesIntersect(a, b) {
    var noOverlap = a.x > b.x + b.width ||
                    b.x > a.x + a.width ||
                    a.y > b.y + b.height ||
                    b.y > a.y + a.height;
                    
    return !noOverlap;
}

function ScrollingWindow(x, y, width, height) {
    self = this;
    
    this.draw = function(context) {
        context.save();
        
        context.translate(self.x, self.y);
        
        context.lineWidth = 1;
        context.rect(0, 0, self.width, self.height);
        context.stroke();
        context.clip();
        
        for(var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
            
            var box = object.getBoundingBox();
            if(boxesIntersect(box, self.getBoundingBox()) {
                object.draw(context);
            }
        }
        
        context.restore();
    };
    
    this.getBoundingBox = function() {
        var box = new Object();
        box.x = self.x;
        box.y = self.y;
        box.width = self.width;
        box.height= self.height;
        
        return box;
    }
    
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.objects = new Array();
}





















/*
 * Main, as it were
 */
var canvas = new Canvas(document.getElementById('d'));

var c = new ClusterBox(10, 20, '#22FF22', 0);

canvas.objects.push(c);
canvas.draw();