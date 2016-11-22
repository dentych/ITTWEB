import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Program, Exercise} from "./program";
import {EXERCISES} from "./exercises";

@Injectable()
export class ProgramService {
    private baseUrl = "https://fitnessapi.herokuapp.com/api";
    private programUrl = this.baseUrl + "/programs";

    constructor(private http: Http) {

    }

    getPrograms(): Promise<Program[]> {
        return this.http.get(this.programUrl, this.getOptions())
            .toPromise()
            .then(response => response.json().program as Program[])
            .catch(this.handleError);
    }

    deleteProgram(id: string): Promise<boolean> {
        return this.http.delete(this.programUrl + "/" + id, this.getOptions())
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getProgram(id: string): Promise<Program> {
        return this.http.get(this.programUrl + "/" + id, this.getOptions())
            .toPromise()
            .then(response => {
                let program = response.json().program;
                if (program.exercises) {
                    program.exercises.forEach(exercise => {
                        let info = EXERCISES[exercise.exerciseInfo];
                        exercise.title = info.title;
                        exercise.description = info.description;
                    })
                }

                return program as Program;
            });
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }

    completeProgram(id: string): Promise<number> {
        console.log("API called");
        let authToken = localStorage.getItem("token");
        let headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        });
        console.log("Authorization: " + "Bearer " + authToken)
        let options = new RequestOptions({headers: headers});
       //noinspection TypeScriptValidateTypes
        return this.http.post(this.programUrl + "/" + id + "/complete" , {}, options)
            .toPromise()
            .then(response => response.json().completed)
            .catch(this.handleError);
    }

    private getOptions(): RequestOptions {
        let authToken = localStorage.getItem("token");
        let headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken
        });

        return new RequestOptions({headers: headers});
    }
}