import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { User } from '../shared/user.model';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-usercomponent',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user: User;

  constructor(private appService: AppService,
    private authService: AuthService) { }

  ngOnInit() {
    this.appService.getUser();
    this.user = this.appService.user;
    console.log(this.user.photoURL);
  }

  signOut(): void {
    this.authService.signOut();
    this.appService.isUserLoggedIn(false, null);
  }

}
