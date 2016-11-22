import {Component, OnInit} from "@angular/core";
import {Program, Exercise} from "./program";
import {ProgramService} from "./program.service";
import {ActivatedRoute, Params} from "@angular/router";

import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: "app/html/program.html"
})
export class ProgramsComponent implements OnInit {
    program: Program;

    constructor(private programService: ProgramService, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => {
            return this.programService.getProgram(params["id"]);
        }).subscribe(program => this.program = program);
    }

    completeProgram(): void {
        if (this.program) {
            this.programService.completeProgram(this.program._id).then(completed => this.program.completed = completed);
        }
    }

    removeExercise(exercise: Exercise): void {
        this.programService.deleteExercise(this.program._id, exercise._id)
            .then(response => {
                let index = this.program.exercises.indexOf(exercise);
                this.program.exercises.splice(index, 1);
            }).catch(reason => alert("Error while deleting exercise"));
    }
}