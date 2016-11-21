import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Program} from "./program";

@Injectable()
export class ProgramService {
    private baseUrl = "https://fitnessapi.herokuapp.com/api";
    private programUrl = this.baseUrl + "/programs";

    constructor(private http: Http) {

    }

    getPrograms(): Promise<Program[]> {
        let authToken = localStorage.getItem("token");
        let headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        });
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.programUrl, options)
            .toPromise()
            .then(response => response.json().program as Program[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}