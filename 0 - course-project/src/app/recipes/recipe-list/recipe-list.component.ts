import { Component, OnDestroy, /*EventEmitter,*/ OnInit /*, Output */ } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: Recipe[];
    subscription: Subscription;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router
    )
    { }

    ngOnInit(): void {
        this.recipes = this.recipeService.getRecipes();
        this.subscription = this.recipeService.recipesChanged.subscribe(
            (newRecipes: Recipe[]) => {
                this.recipes = newRecipes;
            } 
        );

    }

    // @Output() recipeToDisplay = new EventEmitter<Recipe>();

    // onDisplayRecipe(recipeToDisplay: Recipe) {
    //     this.recipeToDisplay.emit(recipeToDisplay);
    // }

    onCreateRecipe() {
        this.router.navigate(
            ['new'],
            {
                relativeTo: this.route,
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
