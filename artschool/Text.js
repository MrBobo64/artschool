var Text = Shape.extend({

    drawSVG: function(svg) {
        var text = svg.createText(this.text);
        svg.populate(text, {
            x: this.getX(),
            y: this.getY(),
            style: this.getSVGStyle()
        });
    
        svg.append(text);
    },

    getText: function() {
        return this.text;
    },
    
    setText: function(text) {
        this.text = text;
    },

    getAnchor: function() {
        return this.anchor;
    },
    
    getFontSize: function() {
        return this.fontSize;
    },
    
    init: function(text, x, y, config) {
        this._super(x, y, config && config.fill || null, config && config.stroke || null);
        
        this.text = text;
        this.anchor = config && config.anchor || 'start';
        this.fontSize = confg && config.fontSize || '12px';
        
        this.addStyle({name: 'text-anchor', func: this.getAnchor});
        this.addStyle({name: 'font-size', func: this.getFontSize});
    }
});