var Circle = Ellipse.extend({

    getRadius: function() {
        return this.radius;
    },
        
    init: function(x, y, r, config) {
        this._super(x, y, r, r, config);
        
        this.radius = r;
    }
});