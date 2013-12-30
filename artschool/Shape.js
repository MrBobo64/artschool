/* Shape extends Component */
function Shape() {
    //this.prototype = new Component();
    //this.prototype.constructor = Shape;
    
    Component.call(this);
    //console.log("Shape Constructor");
    
	this.type = 'shape';
}