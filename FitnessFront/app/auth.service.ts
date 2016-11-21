import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {AuthGuardService} from "./auth-guard.service";

@Injectable()
export class AuthService {
    private baseUrl = "https://fitnessapi.herokuapp.com/api";
    private headers = new Headers({"Content-Type": "application/json"});
    private options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private authGuard: AuthGuardService) {
    }

    // TODO DETYC: Need refactoring. Have to figure out where the login/auth functionality has to be handled
    login(email: string, password: string): Promise<any> {
        return this.http.post(this.baseUrl + "/login", JSON.stringify({email: email, password: password}), this.options)
            .toPromise()
            .then(response => {
                this.authGuard.loggedIn = true;
                return response.json();
            });
    }

    register(email: string, password: string): Promise<any> {
        return this.http.post(this.baseUrl + "/register", JSON.stringify({
            email: email,
            password: password
        }), this.options)
            .toPromise()
            .then(response => response.json());
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}