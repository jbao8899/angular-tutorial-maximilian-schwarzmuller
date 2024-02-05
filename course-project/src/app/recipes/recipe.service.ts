import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe("Schnitzel",
            "A super-tasty Schnitzel - just awesome!",
            "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
            [
                new Ingredient("Meat", 1),
                new Ingredient("French Fries", 20)
            ]),
            new Recipe("Burger",
            "What else do you need to say?",
            "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
            [
                new Ingredient("Buns", 2),
                new Ingredient("Meat", 1)
            ])
    ];
    
    selectedRecipe = new EventEmitter<Recipe>();

    getRecipes() {
        // Would enable modifying this array, as it is returned by reference
        // return this.recipes; 

        return this.recipes.slice(); // Deep copy
    }
}