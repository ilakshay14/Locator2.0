import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  constructor(private appService: AppService) { }

  private user: User;
  private places = [];

  ngOnInit() {
    this.user = this.appService.user;
    // this.appService.fetchPlaceDetailsByID(this.user.savedPlaces).then((response => {
    //   //this.places = response;
    //   console.log(response);
    // }));

    this.user.savedPlaces.forEach(element => {
      this.appService.fetchPlaceDetailsByID(element).then((response => {
        this.places.push(response);
      }));

    });
  }

}
