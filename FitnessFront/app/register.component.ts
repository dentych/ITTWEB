import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
    templateUrl: "app/html/register.html"
})
export class RegisterComponent {
    error: boolean = false;
    errormessage: string;

    constructor(private router: Router, private authService: AuthService) {

    }

    submitForm(email: string, password: string, repeatedpassword: string) {
        if (password !== repeatedpassword) {
            this.errormessage = "Passwords don't match...";
            this.error = true;
        } else {
            this.error = false;
            this.authService.register(email, password).then(response => {
                let token = response.json().token as string;
            }, reason => {
                this.errormessage = reason.json().msg;
                this.error = true;
            });
        }
    }
}