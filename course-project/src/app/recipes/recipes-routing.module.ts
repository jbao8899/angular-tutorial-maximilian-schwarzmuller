import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const routes: Routes = [
    // will run RecipesResolverService before loading this route
    {
        path: "recipes",
        component: RecipesComponent,
        resolve: [RecipesResolverService],
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent }, // http://localhost:4200/recipes
            { path: 'new', component: RecipeEditComponent }, // Must be before :id. Otherwise, "new" will be parsed as the id
                    
            { path: ':id', component: RecipeDetailComponent },
            // Will determine if we are creating or editing a recipe within the RecipeEditComponent
            { path: ':id/edit', component: RecipeEditComponent }   
        ]
    }    
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {

}