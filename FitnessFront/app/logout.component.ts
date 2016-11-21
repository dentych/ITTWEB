import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
    template: `
    Logging out, please wait...
    `
})
export class LogoutComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService) {

    }

    ngOnInit(): void {
        this.authService.logout();
        this.router.navigate(["/login"]);
    }

}