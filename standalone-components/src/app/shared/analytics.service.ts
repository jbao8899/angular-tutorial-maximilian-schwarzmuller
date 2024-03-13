import { Injectable } from '@angular/core';

// providedIn: 'root' will make this service available to all components, standalone or not
// This is the best way of doing things
@Injectable({ providedIn: 'root' }) 
// If you do this instead, you will have to add this to the providers array of the components that need it
// That creates different instances of this service for each component using it
// If you want a global instance, you will have to modify main.ts
// @Injectable()  
export class AnalyticsService {
    registerClick() {
        console.log('Clicked!');
    }
}
