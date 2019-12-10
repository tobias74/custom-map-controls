export class MapsControlButton {

  constructor(googleMap, options) {
    this.googleMap = googleMap;
    this.options = options;

    this.createButton();
    this.afterButtonWasCreated();
  }


  addStyles(element, styles) {
    Object.keys(styles).forEach((styleName) => {
      element.style[styleName] = styles[styleName];
    });
  }

  afterButtonWasCreated() {}

  getTitle() {}

  getButtonStyles() {
    return {
      "backgroundColor": "#fff",
      "border": "none",
      "outline": "none",
      "width": "28px",
      "height": "28px",
      "borderRadius": "2px",
      "boxShadow": "0 1px 4px rgba(0,0,0,0.3)",
      "cursor": "pointer",
      "marginRight": "10px",
      "padding": "0px",
    };
  }

  getIconStyles() {
    return {
      "margin": "5px",
      "width": "18px",
      "height": "18px",
      "backgroundRepeat": "no-repeat",
    };

  }


  createButton() {
    this.controlDiv = document.createElement('div');
    this.addStyles(this.controlDiv, this.options.containerStyles);

    this.buttonElement = document.createElement('button');
    this.buttonElement.type = 'button';
    this.addStyles(this.buttonElement, this.getButtonStyles());
    this.buttonElement.title = this.getTitle();
    this.controlDiv.appendChild(this.buttonElement);


    this.iconDiv = document.createElement('div');
    this.addStyles(this.iconDiv, this.getIconStyles());
    this.buttonElement.appendChild(this.iconDiv);

    this.controlDiv.index = 1;
    this.googleMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.controlDiv);

  }

}
