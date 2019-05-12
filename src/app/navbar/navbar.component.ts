import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private loginStatus: boolean = false;
  
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.loginStatus = this.appService.getLoginStatus();
  }

}
