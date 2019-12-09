export class RadiusWidget extends google.maps.MVCObject {

  constructor(defaults) {
    super();
    this.circle = new google.maps.Circle({
      strokeWeight: 2,
      draggable: true
    });

    this.set('distance', defaults.maxDistance);

    this.sizer = new google.maps.Marker({
      draggable: true,
      icon: {
        url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
        size: new google.maps.Size(15, 15),
        anchor: new google.maps.Point(4, 4)
      },
      title: 'Drag me!'
    });
  }

  isEnabled() {
    return this._isEnabled;
  }

  enableMe() {
    this._isEnabled = true;
    this.bindTo('bounds', this.circle);
    this.circle.bindTo('center', this);
    this.circle.bindTo('map', this);
    this.circle.bindTo('radius', this);
    this.enableSizer();
  }

  disableMe() {
    this._isEnabled = false;
    this.unbindAll();
    this.disableSizer();
    this.circle.unbindAll();
    this.circle.setMap(null);
  }

  distance_changed() {
    this.set('radius', this.get('distance'));
  }

  enableSizer() {
    this.sizer.bindTo('map', this);

    google.maps.event.addListener(this.sizer, 'drag', () => {
      var pos = this.sizer.get('position');
      var center = this.get('center');
      var distance = google.maps.geometry.spherical.computeDistanceBetween(center, pos);
      this.set('distance', distance);
    });
  }

  disableSizer() {
    this.sizer.unbindAll();
    google.maps.event.clearListeners(this.sizer);
    this.sizer.setMap(null);
  }


  center_changed() {
    var bounds = this.get('bounds');

    if (bounds) {
      var lng = bounds.getNorthEast().lng();
      this.sizer.set('position', new google.maps.LatLng(this.get('center').lat(), lng));
    }
  }


}
