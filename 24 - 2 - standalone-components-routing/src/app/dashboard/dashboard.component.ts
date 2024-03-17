import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        // Need this to use routerLink!!!
        // This is standalone, so it doesn't have access to RouterModule from a parent module
        RouterModule 
    ],
    standalone: true
})
export class DashboardComponent {}
