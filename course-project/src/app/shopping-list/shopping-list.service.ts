import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ];

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    AddIngredient(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));

        // Tell the shopping list that we added a new ingredient, provide a new copy
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    AddMultipleIngredients(newIngredients: Ingredient[]) {
        // for (let i = 0; i < newIngredients.length; i++) {
        //     this.ingredients.push(newIngredients[i]);
        // }

        // Spread operation -> ...
        this.ingredients.push(...newIngredients);

        // Not needed, going back to recipe page will automatically regenerate it and display changes?
        this.ingredientsChanged.emit(this.ingredients.slice()); 
    }
}