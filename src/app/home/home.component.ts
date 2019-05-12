import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AppService } from "../shared/app.service";
import axios from "axios";
import { async } from "q";

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

  location = {};
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
    //console.log(form.value);
    if (form.value.pinCode !== undefined) {
      const pinCode = form.value.pinCode;
      //this.placeType = form.value.type;
      this.location = this.appService.fetchLocation(pinCode, this.gmapElement);
    } else {
      this.location = this.appService.fetchLocation(
        undefined,
        this.gmapElement
      );
    }
  }

  fetchPlace(form: NgForm) {
    //console.log(form.value);
    // let placeType;
    // if (form.value.type === '') {
    //   placeType = "restaurant";
    //   //console.log(placeType);
    // } else {
    //   placeType = form.value.type;
    // }

    console.log(this.results);

    this.placesFetched = true;
    this.changeDetector.detectChanges();

    const promise = new Promise(function(resolve, reject) {
      let placeType;
      if (form.value.type === "") {
        placeType = "restaurant";
        //console.log(placeType);
      } else {
        placeType = form.value.type;
      }

      this.appService.fetchPlaces(this.location, placeType, this.gmapElement);

      resolve();
    });

    promise.then(function(data) {
      console.log(data);
    });
  }
}
