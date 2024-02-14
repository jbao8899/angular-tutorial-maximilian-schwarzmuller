import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
    // { path: '', component: HomeComponent },
    // { path: 'users', component: UsersComponent },
    // { path: 'users/:id/:name', component: UserComponent}, // : tells Angular that the id and name are dynamic parts of the path
    // { path: 'servers', component: ServersComponent }, // http://localhost:4200/users -> DO NOT WRITE THE / IN THE PATH HERE
    // { path: 'servers/:id', component: ServerComponent },
    // { path: 'servers/:id/edit', component: EditServerComponent }

    // Using Child Routes
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
        { path: ':id/:name', component: UserComponent}
    ]},
    // servers and its children can only be accessed if AuthGuard gives permission
    {
        path: 'servers',
        // canActivate: [AuthGuard], // This uses AuthGuard's CanActivate function to control access to the whole servers page
        canActivateChild: [AuthGuard], // This uses AuthGuard's CanActivateChildFunction to controll access to all children of this page 
        component: ServersComponent,
        children: [
        { path: ':id', component: ServerComponent, resolve: { server: ServerResolver} }, // Name of property (server) is not used by anything
        // Run CanDeactivateGuard whenever you try to leave the edit server component
        { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] } 
    ]},
    // { path: 'not-found', component: PageNotFoundComponent },
    // { path: '**', redirectTo: '/not-found' } // Wildcard route, must be the last one listed
    // Passing data here is good, as we may use ErrorPageComponent in multiple places
    { path: '**', component: ErrorPageComponent, data: {message: "Route not found!"} }
]

@NgModule({
    imports: [
        // add {useHash: true} argument to RouterModule.forRoot() -> allows hash routing,
        // may be needed for old browsers
        RouterModule.forRoot(appRoutes) // Also need to import this above!!!
    ],
    exports: [
        RouterModule // Export the configured RouterModule
    ]
})
export class AppRoutingModule {

}