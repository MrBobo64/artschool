
Proto = {
	clone: function(obj) {
		if (obj === null || typeof obj !== 'object') {
			return obj;
		}
	
		var n = new Object();
		
		for(var key in obj) {
			n[key] = this.clone(obj[key]);
		}
		
		return n;
	}
};
