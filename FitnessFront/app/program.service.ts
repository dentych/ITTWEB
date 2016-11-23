import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Program} from "./program";
import {EXERCISES, ExerciseInfo} from "./exercises";

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

    completeProgram(id: string): Promise<number> {
        return this.http.post(this.programUrl + "/" + id + "/complete", {}, this.getOptions())
            .toPromise()
            .then(response => response.json().completed)
            .catch(this.handleError);
    }

    addExercise(programId: string, info: ExerciseInfo, sets: number, reps: string): Promise<JSON> {
        let url = this.programUrl + "/" + programId + "/exercises";
        let chosenExercise = {
            id: info.id,
            sets: sets,
            reps: reps
        };
        return this.http.post(url, JSON.stringify({chosenExercises: [chosenExercise]}), this.getOptions())
            .toPromise()
            .then(response => response.json());
    }

    deleteExercise(programId: string, exerciseId: string): Promise<string> {
        let urlProgramId = "/" + programId;
        let urlExerciseId = "/" + exerciseId;

        return this.http.delete(this.programUrl + urlProgramId + "/exercises" + urlExerciseId, this.getOptions())
            .toPromise()
            .then(response => response.json().msg)
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
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