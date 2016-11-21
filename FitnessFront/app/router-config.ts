import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {AuthGuardService} from "./auth-guard.service";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";

export const ROUTES: Routes = [
    {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
    },
    {
        path: "",
        children: [
            {
                path: "dashboard",
                component: DashboardComponent,
                canActivate: [AuthGuardService]
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent
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