import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "/recipes", pathMatch: 'full' },
    {
        path: "recipes",
        component: RecipesComponent,
        children: [
            { path: '', component: RecipeStartComponent }, // http://localhost:4200/recipes
            { path: 'new', component: RecipeEditComponent }, // Must be before :id. Otherwise, "new" will be parsed as the id
            { path: ':id', component: RecipeDetailComponent },
            // Will determine if we are creating or editing a recipe within the RecipeEditComponent
            { path: ':id/edit', component: RecipeEditComponent } 
        ]
    },
    { path: "shopping-list", component: ShoppingListComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}