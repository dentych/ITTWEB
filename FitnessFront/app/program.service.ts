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

    createProgram(programName: string): Promise<Program> {
        let authToken = localStorage.getItem("token");
        let headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        });
        let body = {programName: programName};
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.programUrl, body, options)
            .toPromise()
            .then(response => response.json().program as Program)
            .catch(this.handleError);
    }

    deleteProgram(id: string): Promise<boolean> {
        let authToken = localStorage.getItem("token");
        let headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        });
        let options = new RequestOptions({headers: headers});
        return this.http.delete(this.programUrl + "/" + id, options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getProgram(id: string): Promise<Program> {
        let authToken = localStorage.getItem("token");
        let headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        });
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.programUrl + "/" + id, options)
            .toPromise()
            .then(response => response.json().program as Program);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }

    completeProgram(_id: string): void {
        // KALD COMPLETE API
    }
}