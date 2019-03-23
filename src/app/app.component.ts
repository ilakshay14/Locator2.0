/// <reference types="@types/googlemaps" />

import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'locator';
  lat = 51.678418;
  lng = 7.809007;

  results;
  locationFound = false;

  private latitude = 0.0;
  private longitude = 0.0;


  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(28.5879199, 77.0620314),
      zoom: 16
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  fetchLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.locationFound =  true;
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      this.fetchPlaces();

    }, () => {
      alert('location not found');
    }, {enableHighAccuracy: true});
  }

  fetchLocationByPin(form: NgForm) {
    const pinCode = form.value.pinCode;
    console.log(pinCode);

    const geocoder = new google.maps.Geocoder();
    // tslint:disable-next-line:object-literal-key-quotes
    geocoder.geocode({ 'address': pinCode}, (results, status) => {
      console.log(status);

      if (status === google.maps.GeocoderStatus.OK) {
        this.locationFound = true;
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();

        this.fetchPlaces();
      } else {
          // tslint:disable-next-line:comment-format
          //alert('Geocode was not successful for the following reason: ' + status);
      }
  });
  }

  fetchPlaces() {
    console.log('lat== ' + this.latitude);
    console.log('lng== ' + this.longitude);
    const service = new google.maps.places.PlacesService(this.gmapElement.nativeElement);
    service.nearbySearch({
      location: {lat: this.latitude, lng: this.longitude},
      radius: 5000,
      type: 'restaurant'
    }, (results, status) => {
      this.results = results;
      this.locationFound = false;
    });
  }
}
