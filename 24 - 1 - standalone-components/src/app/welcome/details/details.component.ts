import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics.service';
import { HighlightDirective } from '../../shared/highlight.directive';
// import { SharedModule } from '../../shared/shared.module';
// import { AnalyticsService } from 'src/app/shared/analytics.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    imports: [
        // Here, we import a shared module containing a non-standalone (highlight) directive
        // After we marked the highlight directive as standalone, the SharedModule is no longer needed,
        // So we just import HighlightDirective directly
        // SharedModule
        HighlightDirective
    ],
    providers: [
        // Needed if you omit { providedIn: 'root' } from @Injectable()
        // But different instance of this service will be provided to different components
        // If you want a global instance, you will have to modify main.ts
        // AnalyticsService
    ],
    standalone: true
})
export class DetailsComponent {
    constructor(private analyticsService: AnalyticsService) {}

    onClick() {
        this.analyticsService.registerClick();
    }
}
