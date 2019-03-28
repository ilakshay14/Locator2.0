import { Injectable } from '@angular/core';
import { MapServices } from './map.service';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor(private mapServices: MapServices) { }

    private mapProp = {
        center: new google.maps.LatLng(28.5879199, 77.0620314),
        zoom: 16
    };

    private placesResults: any;

    getMapProp() {
        return this.mapProp;
    }

    fetchPlacesWithAutoDetectLocation(gmapElement) {
        this.mapServices.autoDetectLocation(gmapElement);
        return this.placesResults = this.mapServices.getPlacesResults();
    }

    fetchPlacesWithPinCode(pincode, gmapElement) {
        this.mapServices.detectLocationByPin(pincode, gmapElement);
        return this.placesResults = this.mapServices.getPlacesResults();
    }
}