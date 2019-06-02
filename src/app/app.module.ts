import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './shared/app.service';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './usercomponent/user.component';
import { LoginComponent } from './login/login.component';
import { routing } from './shared/app.routing';
import { HttpService } from './shared/http.service';
import keys from './config/keys.js';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(keys.google.clientID)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(keys.google.facebook)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: keys.google.gmap
    }),
    routing,
    SocialLoginModule
  ],
  providers: [AppService,
    HttpService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
