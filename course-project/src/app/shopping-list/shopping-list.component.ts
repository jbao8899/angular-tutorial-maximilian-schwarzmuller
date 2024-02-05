import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
    ingredients: Ingredient[];

    constructor(private shoppingListService: ShoppingListService ) { }

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();

        // When the list of ingredients changes, update the local copy
        // of the ingredients list
        this.shoppingListService.ingredientsChanged.subscribe(
            (newIngredients: Ingredient[]) => {
                this.ingredients = newIngredients;
            }
        );
    }

    // onIngredientAdded(newIngredient: Ingredient) {
    //     this.ingredients.push(newIngredient);
    // }
}
