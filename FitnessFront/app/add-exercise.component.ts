import {Component, OnInit} from "@angular/core";
import {EXERCISES, ExerciseInfo} from "./exercises";
import {ProgramService} from "./program.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

import "rxjs/add/operator/switchMap";

@Component({
    templateUrl: "app/html/add-exercise.html"
})
export class AddExerciseComponent implements OnInit {
    exercises: ExerciseInfo[] = EXERCISES;
    selectedItem: ExerciseInfo;
    sets: number;
    reps: string;
    errorMsg: string;
    programId: string;

    ngOnInit(): void {
        this.route.params.subscribe(params => this.programId = params["id"] as string);
    }

    constructor(private programService: ProgramService, private route: ActivatedRoute, private router: Router) {

    }

    submitForm(): void {
        this.errorMsg = null;
        if (this.validateForm()) {
            this.addExercise(this.programId);
        } else {
            this.errorMsg = "Please select an exercise and fill out sets and reps.";
        }

        return;
    }

    goBack(): void {
        this.router.navigate(["../"], {relativeTo: this.route});
    }

    private validateForm() {
        return this.selectedItem && this.sets && this.reps;
    }

    private addExercise(programId: any) {
        this.programService.addExercise(programId, this.selectedItem, this.sets, this.reps)
            .then(() => {
                this.goBack();
            }).catch(error => this.errorMsg = "An error occurred while adding exercise.");
    }
}