import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../shared/app.service';
import { AuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser = undefined;
  private loggedIn: boolean;
  private navC: NavbarComponent;

  constructor(private appService: AppService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      //console.log(user);

      if (user) {
        console.log(localStorage.getItem('token'));

        this.user = user;
        this.appService.isUserLoggedIn(true, user);
        this.appService.userLogin(user);
        // setTimeout(() => {
        //   this.router.navigate(['/user']);
        // }, 500);

        this.router.navigate(['/user']);

      }
    });
  }

  userLogIn(form: NgForm) {
    //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    //console.log(form.value);
    //this.appService.userLogin(form.value.username, form.value.password);
  }
  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.appService.isUserLoggedIn(false, null);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


}
