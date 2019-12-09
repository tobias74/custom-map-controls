import { MapsControlButton } from '../MapsControlButton.js';
import { DistanceWidget } from './DistanceWidget.js';

export class DistanceControlButton extends MapsControlButton {


  getImageIcon() {
    return 'url(//maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
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
    console.log('inside enableRadius');
    this.distanceWidget.enableRadius();
  }

  disableRadius() {
    this.distanceWidget.disableRadius();
  }




}
