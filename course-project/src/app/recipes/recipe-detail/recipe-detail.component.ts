import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
    // @Input() recipeToDisplay: Recipe;

    recipeToDisplay: Recipe;
    id: number;
    subscription: Subscription;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router,
        private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        // Not neeeded???
        // this.id = Number(this.route.snapshot.params['id']);
        // this.recipeToDisplay = this.recipeService.getRecipe(this.id);

        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.id = Number(params['id']);
                this.recipeToDisplay = this.recipeService.getRecipe(this.id);
            }
        );
    }

    onExportIngredientsToShoppingList() {
        this.shoppingListService.AddMultipleIngredients(this.recipeToDisplay.ingredients);
    } 

    onEditRecipe() {
        this.router.navigate(
            ['edit'],
            {
                relativeTo: this.route,
            }
        );
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id);

        this.router.navigate(["/recipes"]);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

