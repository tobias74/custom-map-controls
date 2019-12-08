export class MapsControlButton {

  constructor(googleMap, options) {
      this.googleMap = googleMap;
      this.options = options;
      
      this.createButton();
      this.afterButtonWasCreated();
  }

  afterButtonWasCreated() {
    
  }
  
  createButton() {
    	this.controlDiv = document.createElement('div');
    	
    	this.buttonElement = document.createElement('button');
    	this.buttonElement.style.backgroundColor = '#fff';
    	this.buttonElement.style.border = 'none';
    	this.buttonElement.style.outline = 'none';
    	this.buttonElement.style.width = '28px';
    	this.buttonElement.style.height = '28px';
    	this.buttonElement.style.borderRadius = '2px';
    	this.buttonElement.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    	this.buttonElement.style.cursor = 'pointer';
    	this.buttonElement.style.marginRight = '10px';
    	this.buttonElement.style.padding = '0px';
    	this.buttonElement.title = 'Your Location';
    	this.controlDiv.appendChild(this.buttonElement);
    	
    	this.iconDiv = document.createElement('div');
    	this.iconDiv.style.margin = '5px';
    	this.iconDiv.style.width = '18px';
    	this.iconDiv.style.height = '18px';
    	this.iconDiv.style.backgroundImage = this.getImageIcon();
    	this.iconDiv.style.backgroundSize = '180px 18px';
    	this.iconDiv.style.backgroundPosition = '-144px 0';
    	this.iconDiv.style.backgroundRepeat = 'no-repeat';
    	this.buttonElement.appendChild(this.iconDiv);

    	this.controlDiv.index = 1;
    	this.googleMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.controlDiv);

  }
  
}
