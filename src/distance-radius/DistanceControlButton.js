import { MapsControlButton } from '../MapsControlButton.js';
import { DistanceWidget } from './DistanceWidget.js';

export class DistanceControlButton extends MapsControlButton {



  getIconStyles() {
    return {
      ...super.getIconStyles(),
      "backgroundImage": 'url(//icon-library.net/images/distance-icon/distance-icon-24.jpg)',
      "backgroundSize": "30px 30px",
      "width": "30px",
      "height": "30px",

    };
  }

  getButtonStyles() {
    return {
      ...super.getButtonStyles(),
      "width": "40px",
      "height": "40px",
    };
  }


  getTitle() {
    return "Show Radius";
  }

  afterButtonWasCreated() {
    this.createRadiusWidget();
    this.buttonElement.addEventListener('click', () => {
      console.log('yeah clicked....');
      if (this.distanceWidget.isRadiusEnabled()) {
        this.disableRadius();
      } else {
        this.enableRadius();
      }
      this.options.onToggleControlButton(this.distanceWidget.isRadiusEnabled());
    });
  }

  createRadiusWidget() {
    setTimeout(() => {
      this.distanceWidget = new DistanceWidget(this.googleMap, this.options);
    }, 10);
  }

  enableRadius() {
    this.distanceWidget.enableRadius();
  }

  disableRadius() {
    this.distanceWidget.disableRadius();
  }




}
