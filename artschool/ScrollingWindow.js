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
            if(Util.boxesIntersect(box, self.getBoundingBox()) {
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