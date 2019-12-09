import { RadiusWidget } from './RadiusWidget.js';

export class DistanceWidget extends google.maps.MVCObject {

  constructor(map, options) {
    super();
    this.options = options;
    console.log('making the distance widget', this.options);
    this.set('map', map);
    this.set('position', map.getCenter());

    var marker = new google.maps.Marker({
      draggable: true,
      title: 'Move me!'
    });

    // Bind the marker map property to the DistanceWidget map property 
    marker.bindTo('map', this);

    // Bind the marker position property to the DistanceWidget position 
    // property 
    marker.bindTo('position', this);



    // Create a new radius widget 
    this.radiusWidget = new RadiusWidget(this.options);

  }

  enableRadius() {
    this.radiusWidget.enableMe();

    // Bind the radiusWidget map to the DistanceWidget map 
    this.radiusWidget.bindTo('map', this);

    // Bind the radiusWidget center to the DistanceWidget position 
    this.radiusWidget.bindTo('center', this, 'position');

    // Bind to the radiusWidgets' distance property 
    this.bindTo('distance', this.radiusWidget);

    // Bind to the radiusWidgets' bounds property 
    this.bindTo('bounds', this.radiusWidget);

  }

  disableRadius() {
    this.radiusWidget && this.radiusWidget.disableMe();
  }

  isRadiusEnabled() {
    return this.radiusWidget.isEnabled();
  }

  distance_changed() {
    this.options.onNewSearchRadius(this.get('position'), Math.round(this.get('distance')));
  }

  position_changed() {
    console.log(this);
    this.options.onNewSearchRadius(this.get('position'), Math.round(this.get('distance')));
  }


}
