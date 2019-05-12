import { Injectable } from "@angular/core";
import { MapServices } from "./map.service";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private mapServices: MapServices) {}

  location = {};

  private mapProp = {
    center: new google.maps.LatLng(28.5879199, 77.0620314),
    zoom: 16
  };

  private users = [
    { username: "admin", password: "" },
    { username: "user1", password: "abc" }
  ];

  private placesResults: any;
  private loginStatus: boolean = false;

  userLogin(username: String) {
    const result = this.users.find(X => X.username === username);
    //alert(result.username);
    if (result !== undefined) {
      this.loginStatus = true;
    }
    this.loginStatus = false;
  }

  getMapProp() {
    return this.mapProp;
  }

  getLoginStatus() {
    return this.loginStatus;
  }

  fetchLocation(pincode, gmapElement) {
    return (this.location = this.mapServices.detectLocation(
      pincode,
      gmapElement
    ));
  }

  fetchPlaces(loc, placeType, gmapElement) {
    return (this.placesResults = this.mapServices.fetchPlaces(
      loc,
      placeType,
      gmapElement
    ));
  }
}
