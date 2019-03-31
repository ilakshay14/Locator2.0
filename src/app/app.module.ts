import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapServices } from './shared/map.service';
import { AppService } from './shared/app.service';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './usercomponent/user.component';
import { LoginComponent } from './login/login.component';
import { routing } from './shared/app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHY86W7jVXHyVRUgwTpV0ZHjbQCTJSPGw'
    }),
    routing
  ],
  providers: [ AppService, MapServices ],
  bootstrap: [AppComponent]
})
export class AppModule { }
