import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

class Msg {
    constructor(public msg) {

    }
}

@Component({
    selector: "my-app",
    templateUrl: "app/html/login.html"
})
export class LoginComponent {
    loggingIn: boolean = false;
    email: string;
    password: string;
    error: boolean;
    errormsg: string;

    constructor(private router: Router, private authService: AuthService) {
    }

    submitForm(): void {
        this.loggingIn = true;
        // TODO DETYC: Refactor this. Not sure saving the token should be handled here..
        this.authService.login(this.email, this.password).then(response => {
            let token = response.token as string;
            localStorage.setItem("token", token);
            this.router.navigate(["/dashboard"]);
        })
            .catch(reason => {
                this.loggingIn = false;
                this.errormsg = reason.json().msg;
                this.error = true;
            });
    }
}