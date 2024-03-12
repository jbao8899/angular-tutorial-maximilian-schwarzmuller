import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    // If not logged in, we redirect to recipes, then to authentication component
    { path: "", redirectTo: "/recipes", pathMatch: 'full' },
    {
        // Lazy loading the stuff in the recipes module
        path: "recipes",
        loadChildren: () => import('./recipes/recipes.module').then((mod) => mod.RecipesModule)
    },
    {
        // Lazy loading the stuff in the shopping list module
        path: "shopping-list",
        loadChildren: () => import('./shopping-list/shopping-list.module').then((mod) => mod.ShoppingListModule)
    },
    {
        // Lazy loading the stuff in the auth module
        path: "auth",
        loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule)
    }
]

@NgModule({
    imports: [
        // PreloadAllModules -> preload all pages as soon as possible
        // Inital download bundle is still small, but we will preload additional bundles
        // when idle
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
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