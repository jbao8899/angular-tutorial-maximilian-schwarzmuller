import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { ServersService } from './servers/servers.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

// Moved to app-routing.module.ts
// const appRoutes: Routes = [
//     // { path: '', component: HomeComponent },
//     // { path: 'users', component: UsersComponent },
//     // { path: 'users/:id/:name', component: UserComponent}, // : tells Angular that the id and name are dynamic parts of the path
//     // { path: 'servers', component: ServersComponent }, // http://localhost:4200/users -> DO NOT WRITE THE / IN THE PATH HERE
//     // { path: 'servers/:id', component: ServerComponent },
//     // { path: 'servers/:id/edit', component: EditServerComponent }
//
//     // Using Child Routes
//     { path: '', component: HomeComponent },
//     { path: 'users', component: UsersComponent, children: [
//         { path: ':id/:name', component: UserComponent}
//     ]},
//     { path: 'servers', component: ServersComponent, children: [
//         { path: ':id', component: ServerComponent },
//         { path: ':id/edit', component: EditServerComponent } 
//     ]},
//     { path: 'not-found', component: PageNotFoundComponent},
//     { path: '**', redirectTo: '/not-found'} // Wildcard route, must be the last one listed
// ]

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UsersComponent,
        ServersComponent,
        UserComponent,
        EditServerComponent,
        ServerComponent,
        PageNotFoundComponent,
        ErrorPageComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        ServerResolver,
        ServersService,
        CanDeactivateGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
