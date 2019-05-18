import { Injectable } from "@angular/core";
import { debug } from "util";
import { Observable } from "rxjs";
import { Location } from "./location.model";

@Injectable({
  providedIn: "root"
})
export class MapServices {
  constructor() {}

  private results = [];
  private locationFound = false;
  //placeType = 'restaurant';
  location = {
    lat: 0.0,
    lng: 0.0
  };

  map: google.maps.Map;

  setLocation(latitude: number, longitude: number) {
    this.location.lat = latitude;
    this.location.lng = longitude;
  }

  getLocation() {
    return this.location;
  }

  detectLocationWithPinCode(pincode, gmapElement): Observable<Location> {
    const geocoder = new google.maps.Geocoder();
    return new Observable(observer => {
      geocoder.geocode({ address: pincode }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log("Geocoding complete!");
          observer.next({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });
        } else {
          console.log("Error - ", results, " & Status - ", status);
          observer.next({ lat: 0, lng: 0 });
        }
        observer.complete();
      });
    });
  }

  detectLocation(gmapElement, cb) {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.locationFound = true;

        this.setLocation(position.coords.latitude, position.coords.longitude);
        //console.log(this.location);
        cb(this.location);
      },
      () => {
        alert("location not found");
        return null;
      },
      { enableHighAccuracy: true }
    );
  }

  fetchPlaces(location, placeType, gmapElement) {
    const service = new google.maps.places.PlacesService(
      gmapElement.nativeElement
    );
    //console.log("fetching places");
    //console.log(location);

    service.nearbySearch(
      {
        location: location,
        radius: 5000,
        type: placeType
      },
      (results, status) => {
        this.results = results;
        console.log(results);

        this.locationFound = false;
      }
    );

    return this.results;
  }
}
