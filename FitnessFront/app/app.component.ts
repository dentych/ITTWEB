import {Component} from '@angular/core';

@Component({
    selector: 'fitnessapp',
    template: `
    <navbar></navbar>
    <div class="container">
        <div class="row">
            <div class="col-xs-12"><h1 class="text-center">FitnessApp</h1></div>
        </div>
        <router-outlet></router-outlet>
    </div>
`
})
export class AppComponent {
    title = "FitnessApp";
}
