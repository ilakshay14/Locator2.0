import { Injectable } from '@angular/core';
import { debug } from 'util';

@Injectable({
    providedIn: 'root',
})
export class MapServices {
    constructor() { }

    private results = [];
    private locationFound = false;
    //placeType = 'restaurant';

    private latitude = 0.0;
    private longitude = 0.0;
    map: google.maps.Map;

    detectLocation(pincode, gmapElement) {
        if (pincode !== undefined) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': pincode }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    console.log(`locaiton found using pincode ${pincode}`);
                    this.locationFound = true;
                    this.latitude = results[0].geometry.location.lat();
                    this.longitude = results[0].geometry.location.lng();
                    //await this.fetchPlaces(gmapElement);
                }
            });
        } else {
            navigator.geolocation.getCurrentPosition( (position) => {
                console.log('locaiton found');
                this.locationFound = true;
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                //await this.fetchPlaces(gmapElement);
            }, () => {
                alert('location not found');
            }, { enableHighAccuracy: true });
        }

        return {
            lat: this.latitude,
            lng : this.longitude
        }

    }

    fetchPlaces(location, placeType, gmapElement) {
        
        const service = new google.maps.places.PlacesService(gmapElement.nativeElement);
        console.log('fetching places');
        console.log(placeType);
        
        service.nearbySearch({
            location: location,
            radius: 5000,
            type: placeType
        }, async (results, status) => {
            this.results = await results;
            this.locationFound = false;
        });

        return this.results;
    }
}
