var Panel = Container.extend({
	
	/*removeComponentAtIndex: function(component) {
		this._super(component);
		
		this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
	},
	
	removeComponent: function(component) {
		this._super(component);
		
		this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
	},*/
	
	getTiling: function() {
		return this.tiling;
	},
	
	setTiling: function(tiling) {
		this.tiling = tiling;
	},
	
	/*draw: function() {
		var fill = this.getTiling().fill;
		var tiling = this.getTiling().tiling;
		
		if(fill == 'flex') {
			if(tiling == 'vertical') {
				this.positionVerticalFlex();
			}
			else if(tiling == 'horizontal') {
				this.positionHorizontalFlex();
			}
			else {
				console.error('Tiling flex only makes sense with horizontal or vertical');
			}
		}
		else {
			if(tiling == 'vertical') {
				this.positionVertical();
			}
			else if(tiling == 'horizontal') {
				this.positionHorizontal();
			}
			else {
				console.error('only doing horizontal and vertical');
			}
		}
		
		this.makeNewContext();
		var image = this._super();
		
		var context = this.getContext();
		
		return context.getImageData(0, 0, this.getWidth(), this.getHeight());
	},*/
	
	// init
	init: function(config) {
		this._super(config);
		
		this.tiling = new Tiling(config && config.tiling || null);
		
		this.vertical = false;
		if(this.tiling.tiling == 'vertical') {
			this.vertical = true;
		}
		
		this.setType('panel' + (this.tiling.tiling));
	}
});