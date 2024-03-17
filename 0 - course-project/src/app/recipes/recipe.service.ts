import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class RecipeService {
    private recipes: Recipe[] = []; // No longer need the default ones, because we can save the ones we have to Firebase and load them again
    // [
    //     new Recipe("Schnitzel",
    //         "A super-tasty Schnitzel - just awesome!",
    //         "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
    //         [
    //             new Ingredient("Meat", 1),
    //             new Ingredient("French Fries", 20)
    //         ]),
    //         new Recipe("Burger",
    //         "What else do you need to say?",
    //         "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
    //         [
    //             new Ingredient("Buns", 2),
    //             new Ingredient("Meat", 1)
    //         ])
    // ];
    
    // selectedRecipe = new EventEmitter<Recipe>();

    // Changing to service
    // Not really needed, using routing to determine what to show instead
    // selectedRecipe = new Subject<Recipe>();

    recipesChanged = new Subject<Recipe[]>();

    getRecipes() {
        // Would enable modifying this array, as it is returned by reference
        // return this.recipes; 

        return this.recipes.slice(); // Deep copy
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);

        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;

        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);

        this.recipesChanged.next(this.recipes.slice());
    }
}