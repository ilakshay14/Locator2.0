import { Injectable, ChangeDetectorRef } from "@angular/core";
import { HttpService } from "./http.service";
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { User } from './user.model';
import { PathLocationStrategy } from '@angular/common';

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private httpService: HttpService, private router: Router) { }

  private location = {
    lat: 0.0,
    lng: 0.0
  };

  private mapProp = {
    center: new google.maps.LatLng(28.5879199, 77.0620314),
    zoom: 16
  };

  private gmapEl;
  public user: User;
  private placesResults: any;

  public loginStatus: boolean = false;

  isUserLoggedIn(status, user) {
    this.loginStatus = status;

    if (status === false) {
      this.router.navigate(["/home"]);
    }
  }

  setGmapElement(gmapElement) {
    this.gmapEl = gmapElement;
  }

  getGmapElement() {
    return this.gmapEl;
  }

  fetchPlaceDetailsByID(placeID) {
    const service = new google.maps.places.PlacesService(
      this.gmapEl.nativeElement
    );

    // return new Promise((resolve, reject) => {
    //   let places = [];
    //   placeIDArray.forEach(element => {
    //     var request = {
    //       placeId: element,
    //       fields: ['name', 'formatted_address', 'place_id', 'price_level']
    //     };

    //     service.getDetails(request, (place, status) => {
    //       if (status === google.maps.places.PlacesServiceStatus.OK) {
    //         places.push(place);
    //       }

    //     });
    //   });

    //   resolve(places);
    // });



    //return places;
    var request = {
      placeId: placeID,
      fields: ['name', 'formatted_address', 'place_id', 'price_level']
    };

    return new Promise((resolve, reject) => {
      service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(place)
        }
      });
    });

  }

  getLoggedInUser() {
    return this.user;
  }

  userLogin(user) {
    this.user = new User(
      user.id,
      user.name,
      user.email,
      user.photoUrl,
      user.provider,
      [], []
    );

    this.httpService.userSetup(this.user);
    this.getUser();
  }

  getUser() {
    (this.httpService.getUser(this.user.id)).then(response => {
      this.user = response['data']

    });


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
        //console.log("Geocoding complete!");

        this.location.lat = results[0].geometry.location.lat();
        this.location.lng = results[0].geometry.location.lng();

        // console.log(results);
        // console.log(status);
        // console.log(this.location);
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
