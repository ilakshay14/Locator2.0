import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AppService } from "../shared/app.service";
import axios from "axios";
import { async, delay } from "q";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  title = "locator";
  lat = 51.678418;
  lng = 7.809007;

  results;
  locationFound = false;
  //placeType = 'restaurant';

  private latitude = 0.0;
  private longitude = 0.0;

  location;
  placesFetched = false;

  constructor(
    private appService: AppService,
    private changeDetector: ChangeDetectorRef
  ) {}

  @ViewChild("gmap") gmapElement: any;
  map: google.maps.Map;

  @ViewChild("placeResults") resultsDiv: any;

  ngOnInit() {
    const mapProp = this.appService.getMapProp();

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  fetchLocation(form: NgForm) {
    console.log(form.value.pinCode);
    if (form.value.pinCode !== "") {
      const pinCode = form.value.pinCode;
      //this.placeType = form.value.type;
      this.location = this.appService.fetchLocationWithPin(
        pinCode,
        this.gmapElement
      );
    } else {
      this.location = this.appService.fetchLocation(this.gmapElement);
      
      console.log(this.location);
    }
  }

  fetchPlace(form: NgForm) {

    let placeType;
    if (form.value.type === "") {
      placeType = "restaurant";
    } else {
      placeType = form.value.type;
    }

    this.results = this.appService.fetchPlaces(
      this.location,
      placeType,
      this.gmapElement
    );
  }
}
