import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent}   from './app.component';
import {DashboardComponent} from "./dashboard.component";
import {ProgramService} from "./program.service";

const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    providers: [ProgramService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
