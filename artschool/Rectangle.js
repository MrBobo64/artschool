var Rectangle = Shape.extend({

    drawSVG: function(svg) {
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
    },

    getRx: function() {
        return this.rx;
    },
    
    getRy: function() {
        return this.ry;
    },
    
    init: function(x, y, width, height, config) {
        this._super(x, y, config && config.fill || null, config && config.stroke || null);
        
        this.width = width;
        this.height = height;
        
        this.rx = config && config.rx || 0;
        this.ry = config && config.ry || 0;
    }
});