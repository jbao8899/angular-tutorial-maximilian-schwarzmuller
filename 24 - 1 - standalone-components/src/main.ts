// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
// import { AnalyticsService } from './app/shared/analytics.service';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// Changed
bootstrapApplication(
    AppComponent,
    {
        // Equivalent of @Injectable({ providedIn: 'root' }) 
        providers: [
            // AnalyticsService
        ]
    });