import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipeService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.recipeService.getRecipes().length == 0) {
            // If we don't have recipes, fetch them from the server
            return this.dataStorageService.FetchRecipes(); // Not subscribing, resolver will subscribe automatically
        }
        else {
            // otherwise, use the local ones
            return this.recipeService.getRecipes();
        }

    }
}