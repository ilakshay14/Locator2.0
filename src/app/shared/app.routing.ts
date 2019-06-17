import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../usercomponent/user.component';
import { SearchHistoryComponent } from '../search-history/search-history.component';
import { LocationHistoryComponent } from '../location-history/location-history.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { RouteGuardService } from './routeGuard.service';



const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'user', component: UserComponent, canActivate: [RouteGuardService], children: [
            { path: '', redirectTo: 'user/searchHistory', pathMatch: 'full' },
            { path: 'searchHistory', component: SearchHistoryComponent },
            { path: 'locationHistory', component: LocationHistoryComponent },
            { path: 'favourites', component: FavouritesComponent },
            { path: 'wishlist', component: WishlistComponent }
        ]
    }
];

export const routing = RouterModule.forRoot(routes);
