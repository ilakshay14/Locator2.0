import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MapServices {
    constructor() { }

    results;
    locationFound = false;
    placeType = 'restaurant';

    private latitude = 0.0;
    private longitude = 0.0;
    map: google.maps.Map;

    getPlacesResults() {
        return this.results;
    }

    autoDetectLocation(gmapElement) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.locationFound = true;
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.fetchPlaces(gmapElement);
        }, () => {
            alert('location not found');
        }, { enableHighAccuracy: true });
    }

    detectLocationByPin(pincode, gmapElement) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': pincode }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                this.locationFound = true;
                this.latitude = results[0].geometry.location.lat();
                this.longitude = results[0].geometry.location.lng();
                this.fetchPlaces(gmapElement);
            } else {

            }
        });
    }

    fetchPlaces(gmapElement) {
        // console.log('lat== ' + this.latitude);
        // console.log('lng== ' + this.longitude);
        const service = new google.maps.places.PlacesService(gmapElement.nativeElement);
        service.nearbySearch({
            location: { lat: this.latitude, lng: this.longitude },
            radius: 5000,
            type: this.placeType
        }, (results, status) => {
            this.results = results;
            this.locationFound = false;
        });
    }
}
