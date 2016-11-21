import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";
@Component({
    selector: "navbar",
    templateUrl: "app/html/navbar.html"
})
export class NavbarComponent implements OnInit {
    username: string;
    loggedIn: boolean;

    constructor(private authGuard: AuthGuardService) {

    }

    ngOnInit(): void {
        this.loggedIn = this.authGuard.loggedIn;
    }
}