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

  searchingForLocationText: string =
    "Fetching your Location. Loading data... Click again!";

  LocationFoundText: string = "We found you! You may search for a palce now!";
  PlacesFoundText: string = "Fetching places. Please click again";

  results;
  locationFound = false;
  placesFound = false;

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
    this.searchingForLocationText =
      "Fetching your Location. Loading data... Click again!";
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

    if (this.location === undefined || this.location === { lat: 0, lng: 0 }) {
      console.log(this.location);

      this.locationFound = false;
    } else {
      this.locationFound = true;
    }
  }

  fetchPlace(form: NgForm) {
    this.locationFound = false;
    this.placesFound = false;
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
    this.placesFound = true;
    this.changeDetector.detectChanges();
    setTimeout(() => {
      this.placesFound = false;
    }, 1000);
  }
}
