import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.css',
    providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
    recipeToDisplay: Recipe = null;

    constructor(private recipeService: RecipeService) { }

    ngOnInit() {
        this.recipeService.selectedRecipe.subscribe(
            (recipe: Recipe) => {
                this.recipeToDisplay = recipe
            }
        )
    }

    onDisplayRecipe(setRecipeToDisplay: Recipe) {
        this.recipeToDisplay = setRecipeToDisplay;
    }
}
