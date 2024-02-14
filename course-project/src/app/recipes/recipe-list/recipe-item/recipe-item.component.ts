import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
    @Input() recipe: Recipe;
    @Input() index: number;

    // Can get the specific recipe within the list component!!!
    // No longer going Recipe Item -> Recipe List -> Recipes -> Recipe Details, but just using a service
    // @Output() recipeSelected = new EventEmitter<void>();

    constructor(/*private recipeService: RecipeService*/) { }

    // No longer needed
    // onDisplayRecipe() {
    //     // this.recipeSelected.emit();

    //     this.recipeService.selectedRecipe.emit(this.recipe);
    // } 
}
