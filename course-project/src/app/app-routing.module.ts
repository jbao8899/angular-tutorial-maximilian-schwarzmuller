import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
    // If not logged in, we redirect to recipes, then to authentication component
    { path: "", redirectTo: "/recipes", pathMatch: 'full' },
    { path: "shopping-list", component: ShoppingListComponent },
    { path: "auth", component: AuthComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    // Every module works on its own. Does not use stuff from other modules.
    // By exporting RouterModule, we enable other modules to use the routes set up here
    // If they import AppRoutingModule, they will get these routes
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}