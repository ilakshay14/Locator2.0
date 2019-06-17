import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: "root"
})

export class RouteGuardService implements CanActivate {
    constructor(private appService: AppService,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (this.appService.getLoginStatus()) {
            return true;
        } else {
            this.router.navigate(["/login"]);
        }
    };




}