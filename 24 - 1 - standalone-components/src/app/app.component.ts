import { Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [WelcomeComponent], // Import this, now that this component is standalone
    standalone: true
})
export class AppComponent {}
