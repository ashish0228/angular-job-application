import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthGuardService implements CanActivate {

    helper = new JwtHelperService();

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('user')) {
            let token = JSON.parse(localStorage.getItem('user') || '');
            if (token.accessToken)  {
                return true;
            } else {
                return false;
            } 
        }
        return false;
    }
}