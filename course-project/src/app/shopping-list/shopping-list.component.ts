import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[];

    constructor(private shoppingListService: ShoppingListService ) { }

    private subscription: Subscription;

    ngOnInit() {
        this.ingredients = this.shoppingListService.GetIngredients();

        // When the list of ingredients changes, update the local copy
        // of the ingredients list
        this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
            (newIngredients: Ingredient[]) => {
                this.ingredients = newIngredients;
            }
        ); // Don't need to change this when ingredientsChanged becomes a Subject instead of an EventEmitter
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSelectItem(index: number) {
        // Other places can listen for this and see which item was selected 
        this.shoppingListService.startedEditing.next(index);
    }

    // onIngredientAdded(newIngredient: Ingredient) {
    //     this.ingredients.push(newIngredient);
    // }
}
