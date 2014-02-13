var Text = Shape.extend({

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
    
    draw: function() {
        var paper = ArtSchool.snap;
        var text = paper.text(0, 0, this.getText());
        text.attr({
            fill: this.getFill(),
            stroke: this.getStroke(),
            strokeWidth: this.getStrokeWidth()
        });
        
        return text;
    },
    
    init: function(config) {
        this._super(config && config.dimensions || null, config && config.style || null);
        
        this.text = config && config.text;
        this.anchor = config && config.anchor || 'start';
        this.fontSize = confg && config.fontSize || '12px';
        
        //this.addStyle({name: 'text-anchor', func: this.getAnchor});
        //this.addStyle({name: 'font-size', func: this.getFontSize});
    }
});