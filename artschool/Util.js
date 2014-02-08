
Util = {
    /*
     * pointInBoundingBox
     *   - True if a point is within a bounding box
     */
    pointInBoundingBox: function(p, box) {
        if(p.x >= box.x && p.x <= box.x + box.width) {
            if(p.y >= box.y && p.y <= box.y + box.height) {
                return true;
            }
        }

        return false;
    },

    /*
     * boxesIntersect
     *  - True if two boxes intersect
     */
    boxesIntersect: function(a, b) {
        var noOverlap = a.x > b.x + b.width ||
                        b.x > a.x + a.width ||
                        a.y > b.y + b.height ||
                        b.y > a.y + a.height;
                        
        return !noOverlap;
    },
	
	getPixel: function(image, x, y) {
		if(x > image.width || y > image.height ||
				x < 0 || y < 0) {
			return {r:0, g:0, b:0, a:0};
		}
		
		var index = (image.width * y + x) * 4;
		var r = image.data[index];
		var g = image.data[index+1];
		var b = image.data[index+2];
		var a = image.data[index+3];
		
		return {r:r, g:g, b:b, a:a};
	},
	
	setPixel: function(image, x, y, value) {
		if(x > image.width || y > image.height ||
				x < 0 || y < 0) {
			console.error('no pixel at ' + x + ' ' + y);
			return;
		}
		
		
	},
	
	drawOn: function(base, image, x, y) {
		for(var j = 0; j < image.height; j++) {
			for(var i = 0; i < image.width; i++) {
				
			}
		}
	}
};

