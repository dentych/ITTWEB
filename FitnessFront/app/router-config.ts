import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {AuthGuardService} from "./auth-guard.service";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {LogoutComponent} from "./logout.component";

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