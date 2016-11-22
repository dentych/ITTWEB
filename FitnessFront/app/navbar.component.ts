import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";
import {ProgramService} from "./program.service";
import {Router} from "@angular/router";

@Component({
    selector: "navbar",
    templateUrl: "app/html/navbar.html"
})
export class NavbarComponent implements OnInit {
    username: string;
    loggedIn: boolean;

    constructor(private authGuard: AuthGuardService, private programService: ProgramService, private router: Router) {

    }

    ngOnInit(): void {
        this.loggedIn = this.authGuard.loggedIn;
    }

    createProgram(): void {
        var programName = prompt("Enter Program name:", "Titel here");

        if (programName !== "" && programName != undefined) {
            this.programService.createProgram(programName).then(program=>this.router.navigate(["/programs", program._id]));
        }
    }

}