import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ];
    
    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    GetIngredients() {
        return this.ingredients.slice();
    }

    GetIngredient(index: number) {
        return this.ingredients[index];
    }

    AddIngredient(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));

        // Tell the shopping list that we added a new ingredient, provide a new copy
        // this.ingredientsChanged.emit(this.ingredients.slice());

        // Using subjects
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    AddMultipleIngredients(newIngredients: Ingredient[]) {
        // for (let i = 0; i < newIngredients.length; i++) {
        //     this.ingredients.push(newIngredients[i]);
        // }

        // Spread operation -> ...
        this.ingredients.push(...newIngredients);

        // Not needed, going back to recipe page will automatically regenerate it and display changes?
        // this.ingredientsChanged.emit(this.ingredients.slice()); 

        // using subject instead
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    UpdateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;

        // Announce update
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    DeleteIngredient(index: number) {
        this.ingredients.splice(index, 1);

        // Announce deletion
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}