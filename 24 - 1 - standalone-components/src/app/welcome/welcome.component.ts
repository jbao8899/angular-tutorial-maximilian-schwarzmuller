import { Component } from '@angular/core';
import { DetailsComponent } from './details/details.component';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    standalone: true,
    imports: [
        // Need to import this to use it
        DetailsComponent
    ]
})
export class WelcomeComponent {}
