import {Component, OnInit} from "@angular/core";
import {Program} from "./program";
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
            this.programService.completeProgram(this.program._id);
        }
    }
}