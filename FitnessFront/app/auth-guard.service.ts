import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate {
    loggedIn: boolean;

    constructor(private router: Router) {
        let token = localStorage.getItem("token");
        if (token) {
            this.loggedIn = true;
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (this.loggedIn) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}