import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ProgramService} from "./program.service";
import {Program} from "./program";

@Component({
    templateUrl: "app/html/dashboard.html"
})
export class DashboardComponent implements OnInit {
    title = "Dashboard";
    programs: Program[];

    constructor(private programService: ProgramService, private router: Router) {
    }

    ngOnInit(): void {
        this.programService.getPrograms().then(programs => {
            this.programs = programs;
        });
    }

    showProgram(id: string): void {
        this.router.navigate(["/programs", id]);
    }

    deleteProgram(index: Program): void {
        let answer = confirm("You damn sure u gon delete dis program?");
        if(answer) {
            this.programService.deleteProgram(index._id);
            let programToRemove = this.programs.indexOf(index);
            this.programs.splice(programToRemove,1);
        }
    }

}