var SVG = Class.extend({

    create: function(shape) {
        return this.getSVGDocument().createElementNS(this.getSVGNS(), shape);
    },

    createRect: function() {
        return this.create('rect');
    },
    
    createEllipse: function() {
        return this.create('ellipse');
    },
    
    createTextNode: function(value) {
        return document.createTextNode(value);
    },
    
    createText: function(value) {
        var text = this.create('text');
        
        var textNode = this.createTextNode(value);
        text.appendChild(textNode);
        
        return text;
    },
    
    createLine: function() {
        return this.create('line');
    }

    populate: function(object, dict) {
        for(var key in dict) {
            object.setAttribute(null, key, dict[key]);
        }
    }
});
