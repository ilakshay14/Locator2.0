import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'locator';
  lat = 51.678418;
  lng = 7.809007;

  results;
  locationFound = false;
  placeType: string = 'restaurant';

  private latitude = 0.0;
  private longitude = 0.0;

  constructor (private appService : AppService) {}

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  ngOnInit() {
    const mapProp = this.appService.getMapProp();

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  fetchLocation() {
    this.results = this.appService.fetchPlacesWithAutoDetectLocation(this.gmapElement);
  }

  fetchLocationByPin(form: NgForm) {
    const pinCode = form.value.pinCode;
    this.placeType = form.value.type;

    this.results = this.appService.fetchPlacesWithPinCode(pinCode,this.gmapElement);
  }

}
