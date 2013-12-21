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
        self.dragObject.drag(p, self.dragPoint);
    
        self.dragPoint = p;
            
        self.dragObject.draw(self.context);
    };

    this.onMouseDown = function(mouseEvent) {
        var p = self.getPointFromMouse(mouseEvent);
        for(var i = 0; i < self.objects.length; i++) {
            var object = self.objects[i];
            var box = object.getBoundingBox();

            if(Util.pointInBoundingBox(p, box)) {
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
