import { Injectable, ChangeDetectorRef } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private httpService: HttpService) {}

  location = {
    lat: 0.0,
    lng: 0.0
  };

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

  userLogin(username: string, password: string) {
    console.log(`username ${username} and password ${password}`);
    this.httpService.userLogin(username, password);
    // const result = this.users.find(X => X.username === username);
    // //alert(result.username);
    // if (result !== undefined) {
    //   this.loginStatus = true;
    // }
    // this.loginStatus = false;
  }

  getMapProp() {
    return this.mapProp;
  }

  getLoginStatus() {
    return this.loginStatus;
  }

  setLocation(latitude: number, longitude: number) {
    this.location.lat = latitude;
    this.location.lng = longitude;
  }

  getLocation() {
    return this.location;
  }

  fetchLocation(gmapElement) {
    let loc;
    do {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.location.lat = position.coords.latitude;
          this.location.lng = position.coords.longitude;
        },
        () => {
          alert("location not found");
          return null;
        },
        { enableHighAccuracy: true }
      );
    } while (
      this.location ===
      {
        lat: 0.0,
        lng: 0.0
      }
    );
    return this.location;
  }

  fetchLocationWithPin(pincode, gmapElement) {
    // this.mapServices
    //   .detectLocationWithPinCode(pincode, gmapElement)
    //   .subscribe((loc: Location) => {
    //     this.location = loc;
    //   });
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: pincode }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log("Geocoding complete!");

        this.location.lat = results[0].geometry.location.lat();
        this.location.lng = results[0].geometry.location.lng();

        console.log(results);
        console.log(status);
        console.log(this.location);
      } else {
      }
    });

    return this.location;
  }

  fetchPlaces(loc, placeType, gmapElement) {
    // this.placesResults = this.mapServices.fetchPlaces(
    //   loc,
    //   placeType,
    //   gmapElement
    // );
    const service = new google.maps.places.PlacesService(
      gmapElement.nativeElement
    );

    service.nearbySearch(
      {
        location: loc,
        radius: 5000,
        type: placeType
      },
      (results, status) => {
        this.placesResults = results;
        console.log(results);
      }
    );

    return this.placesResults;
  }
}
