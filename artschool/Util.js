
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
    }
};

