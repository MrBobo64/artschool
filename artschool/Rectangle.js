var Rectangle = Shape.extend({

    /*drawSVG: function(svg) {
        var rect = svg.createRectangle();
        svg.populate(rect, {
            x: this.getX(),
            y: this.getY(),
            rx: this.getRx(),
            ry: this.getRy(),
            width: this.getWidth(),
            height: this.getHeight(),
            style: this.getSVGStyle()
        });
        
        svg.append(rect);
    },*/

    draw: function() {
        var paper = this.getNewSnap();
        var rect = paper.rect(0, 0, this.getWidth(), this.getHeight(), this.getRx(), this.getRy());
        rect.attr({
            fill: this.getFill(),
            stroke: this.getStroke(),
            strokeWidth: this.getStrokeWidth()
        });
        
        return rect;
    },
    
    getRx: function() {
        return this.rx;
    },
    
    getRy: function() {
        return this.ry;
    },
    
    init: function(config) {
        this._super(config && config.dimensions || null, config && config.style || null);
        
        this.rx = config && config.rx || 0;
        this.ry = config && config.ry || 0;
    }
});