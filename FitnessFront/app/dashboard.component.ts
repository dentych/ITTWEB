import {Component, OnInit} from "@angular/core";
import {ProgramService} from "./program.service";

@Component({
    selector: "my-app",
    templateUrl: "app/html/dashboard.html"
})
export class DashboardComponent implements OnInit {
    title = "Dashboard";
    programs: Program[];

    constructor(private programService: ProgramService) {
    }

    ngOnInit(): void {
        this.programService.getPrograms().then(programs => this.programs = programs);
    }

}