import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

@Injectable()
export class ProgramService {
    private baseUrl = "https://fitnessapi.herokuapp.com/api";
    private programUrl = this.baseUrl + "/programs";

    constructor(private http: Http) {

    }

    getPrograms(): Promise<Program[]> {
        return this.http.get(this.programUrl)
            .toPromise()
            .then(response => response.json().data as Program[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}