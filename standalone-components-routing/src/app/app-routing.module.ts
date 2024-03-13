import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { WelcomeComponent } from './welcome/welcome.component';

// Must import RouterModule in app.component.ts and do importProvidersFrom(AppRoutingModule) in main.ts

const routes: Route[] = [
    {
        path: '',
        component: WelcomeComponent,
    },
    {
        path: 'about',
        // component: AboutComponent,

        // Special lazy loading syntax for standalone components
        // standalone components can be loaded lazily without a module, unlike regular components
        loadComponent: () => import('./about/about.component').then(mod => mod.AboutComponent),
    },
    {
        // Lazy loading
        path: 'dashboard',
        loadChildren: () =>
        import('./dashboard/routes').then(
            (mod) => mod.DashboardRoutes
        ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
