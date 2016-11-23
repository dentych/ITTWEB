import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {AuthGuardService} from "./auth-guard.service";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {LogoutComponent} from "./logout.component";
import {ProgramsComponent} from "./program.component"
import {AddExerciseComponent} from "./add-exercise.component";

export const ROUTES: Routes = [
    {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
    },
    {
        path: "",
        canActivate: [AuthGuardService],
        children: [
            {
                path: "dashboard",
                component: DashboardComponent,
            },
            {
                path: "programs/:id",
                component: ProgramsComponent
            },
            {
                path: "programs/:id/add-exercise",
                component: AddExerciseComponent
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "logout",
        component: LogoutComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "success",
        component: DashboardComponent
    },
    {
        path: "**",
        redirectTo: "/dashboard",
        pathMatch: "full"
    }
];