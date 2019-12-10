import { DistanceControlButton } from '../distance-radius/DistanceControlButton.js';
import { SimpleLocationButton } from '../SimpleLocationButton.js';




export class SearchMap {

  constructor(myMapDiv, placeSearchInput, options) {
    this.options = options;
    this.placeSearchInput = placeSearchInput;

    var latLng = new google.maps.LatLng(options.latitude, options.longitude);

    var mapOptions = {
      center: latLng,
      zoom: (this.options.zoom || this.options.zoom === 0) ? this.options.zoom : 12,
      gestureHandling: 'greedy',
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.googleMap = new google.maps.Map(myMapDiv, mapOptions);


    this.distanceControl = new DistanceControlButton(this.googleMap, {
      ...this.options,
      containerStyles: {
        marginTop: "10px",
        marginBottom: "10px",
      },
    });
    this.locationButton = new SimpleLocationButton(this.googleMap, {
      ...this.options,
      containerStyles: {
        marginTop: "10px",
        marginBottom: "10px",
      },
    });

    this.addEventListeners();

  }

  addEventListeners() {
    google.maps.event.addListener(this.googleMap, 'zoom_changed', () => {
      this.options.onZoomChanged(this.googleMap.getZoom());
    });
  }

  createPlaceSearchInput() {
    var searchBox = new google.maps.places.SearchBox(this.placeSearchInput);

    searchBox.addListener('places_changed', () => {

      console.debug('place changed');

      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      var myPlace = places[0];
      console.debug(myPlace.geometry.location);

      var latlng = new google.maps.LatLng(myPlace.geometry.location.lat(), myPlace.geometry.location.lng());
      this.options.onNewCenterLocation(latlng);
      this.options.afterPlacesChanged(latlng);
    });
  }



  enableRadius() {
    console.log('inside enableRadius');
    this.distanceControl.enableRadius();
  }

  disableRadius() {
    this.distanceControl.disableRadius();
  }

  setCenter(latlng) {
    this.googleMap.setCenter(latlng);
  }


}




