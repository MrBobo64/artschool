
var Shape = Component.extend({

    /*drawSVG: function(svg) {
        console.error('Base class Shape cannot draw SVG');
    },
    
    addStyle: function(style) {
        this.getStyles().push(style);
    },
    
    getStyles: function() {
        return this.styles;
    },
    
    getSVGStyle: function() {
        var styles = this.getStyles();
        var styleString = "";
        for(var i = 0; i < styles.length; i++) {
            var style = styles[i];
            styleString = styleString + style.name + ':' + style.func.call(this) + '; ';
        }
    
        return styleString;
        //return "stroke:" + this.getStroke() + "; fill:" + this.getFill() + ":";
    },
    
    drawCanvas: function(context) {
        console.error('Base class Shape cannot draw Canvas');
    },

    getX: function() {
        return this.x;
    },
    
    setX: function(x) {
        this.x = x;
    }
    
    getY: function() {
        return this.y;
    },
    
    setY: function(y) {
        this.y = y;
    },*/
    
    getFill: function() {
        return this.fill;
    },
    
    setFill: function(fill) {
        this.fill = fill;
    },
    
    getStroke: function() {
        return this.stroke;
    },
    
    setStroke: function(stroke) {
        this.stroke = stroke;
    },
    
    getStrokeWidth: function() {
        return this.strokeWidth;
    },
    
    setStrokeWidth: function(strokeWidth) {
        this.strokeWidth = strokeWidth;
    },
    
    /*addAttribute: function(attribute) {
        this.getAttributes().push(attribute);
    },
    
    getAttributes: function() {
        return this.attributes;
    },
    
    createAttribute: function() {
        var attributes = this.attributes();
        var styleString = "";
        for(var i = 0; i < styles.length; i++) {
            var style = styles[i];
            styleString = styleString + style.name + ':' + style.func.call(this) + '; ';
        }
    
        return styleString;
        //return "stroke:" + this.getStroke() + "; fill:" + this.getFill() + ":";
    },*/
    
    init: function(dimensions, style) {
        this._super(dimensions);
        
        this.fill = style && style.fill || '#00FF00';
        this.stroke = style && style.stroke || '#00FF00';
        this.strokeWidth = style && style.strokeWidth || 0;
        
        this.styles = [
            {name: 'stroke', func: this.getStroke},
            {name: 'strokeWidth', func: this.getStrokeWidth},
            {name: 'fill', func: this.getFill}
        ];
    }
});