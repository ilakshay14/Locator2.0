import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private loginStatus: boolean = false;
  private user;

  constructor(private appService: AppService,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginStatus = this.appService.getLoginStatus();
    console.log('init');

  }

  setLoginStatus(status: boolean) {
    this.loginStatus = status;
  }

  signOut(): void {
    this.authService.signOut();
    this.appService.isUserLoggedIn(false, null);
  }

}
