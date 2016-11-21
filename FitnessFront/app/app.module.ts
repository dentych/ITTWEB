import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard.component";
import {ProgramService} from "./program.service";
import {ROUTES} from "./router-config";
import {AuthGuardService} from "./auth-guard.service";
import {LoginComponent} from "./login.component";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./auth.service";
import {RegisterComponent} from "./register.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(ROUTES)
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [ProgramService, AuthGuardService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
