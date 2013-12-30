/* Shape extends Component */
function Shape() {
    Component.call(this);
    //console.log("Shape Constructor");
    
	this.type = 'shape';
    
    this.prototype = new Component();
    this.prototype.constructor = Shape;
}