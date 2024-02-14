import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
    // @Input() recipeToDisplay: Recipe;

    recipeToDisplay: Recipe;
    id: number;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router,
        private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        // Not neeeded
        // this.id = Number(this.route.snapshot.params['id']);
        // this.recipeToDisplay = this.recipeService.getRecipe(this.id);

        this.route.params.subscribe(
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
}

