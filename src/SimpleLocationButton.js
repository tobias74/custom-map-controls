import { MapsControlButton } from './MapsControlButton.js';

export class SimpleLocationButton extends MapsControlButton {


  getIconStyles() {
    let styles = super.getIconStyles();
    return {
      ...styles,
      "backgroundImage": 'url(//maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)',
      "backgroundSize": "180px 18px",
      "backgroundPosition": "-144px 0",
    };
  }

  getTitle() {
    return 'Your Location';
  }

  afterButtonWasCreated() {
    google.maps.event.addListener(this.googleMap, 'dragend', () => {
      $(this.iconDiv).css('background-position', '0px 0px');
    });

    this.buttonElement.addEventListener('click', () => {
      var imgX = '0';

      var animationInterval = setInterval(() => {
        if (imgX == '-18')
          imgX = '0';
        else
          imgX = '-18';
        $(this.iconDiv).css('background-position', imgX + 'px 0px');
      }, 500);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

          var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          this.googleMap.setCenter(latlng);

          this.options.onNewCenterLocation && this.options.onNewCenterLocation(latlng);

          clearInterval(animationInterval);
          $(this.iconDiv).css('background-position', '-144px 0px');
        });
      } else {
        clearInterval(animationInterval);
        $(this.iconDiv).css('background-position', '0px 0px');
      }
    });



  }



}
