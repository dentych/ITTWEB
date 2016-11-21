import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ProgramService} from "./program.service";
import {Program} from "./program";

@Component({
    selector: "my-app",
    templateUrl: "app/html/dashboard.html"
})
export class DashboardComponent implements OnInit {
    title = "Dashboard";
    programs: Program[];

    constructor(private programService: ProgramService, private router: Router) {
    }

    ngOnInit(): void {
        this.programService.getPrograms().then(programs => {
            console.log("PROGRAMS!");
            console.log(programs);
            this.programs = programs;
        });
    }

    seeProgram(index: string): void {
        this.router.navigate(["/program/", index]);
        console.log("Going to program: " + index);
    }

    deleteProgram(index: Program) {
        var answer = confirm("You damn sure u gon delete dis program?");
        if(answer) {
            this.programService.deleteProgram(index._id);
            console.log("I deleted Stuff: " + index);
            let programToRemove = this.programs.indexOf(index);
            this.programs.splice(programToRemove,1);
        }
    }

}