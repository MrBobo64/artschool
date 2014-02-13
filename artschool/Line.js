var Line = Shape.extend({

    drawSVG: function(svg) {
        var line = svg.createLine();
        svg.populate(line, {
            x1: this.getX1(),
            y1: this.getY1(),
            x2: this.getX2(),
            y2: this.getY2(),
            style: this.getSVGStyle()
        });
    }

    getX1: function() {
        return this.x1;
    },

    getX2: function() {
        return this.x2;
    },
    
    getY1: function() {
        return this.y1;
    },

    getY2: function() {
        return this.y2;
    },

    init: function(x1, y1, x2, y2, config) {
        this._super(x, y, config && config.fill || null, config && config.stroke || null);
        
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
});