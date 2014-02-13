var Ellipse = Shape.extend({

    drawSVG: function(svg) {
        var ellipse = svg.createEllipse();
        svg.populate(ellipse, {
            cx: this.getX(),
            cy: this.getY(),
            rx: this.getRx(),
            ry: this.getRy(),
            style: this.getSVGStyle()
        });
        
        svg.append(ellipse);
    },

    getRx: function() {
        return this.rx;
    },
    
    getRy: function() {
        return this.ry;
    },
    
    init: function(x, y, rx, ry, config) {
        this._super(x, y, config && config.fill, config && config.stroke);
        
        this.rx = rx;
        this.ry = ry;
    }
});