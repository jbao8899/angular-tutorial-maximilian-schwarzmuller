import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  // Can get the specific recipe within the list component!!!
  @Output() recipeSelected = new EventEmitter<void>();

  onDisplayRecipe() {
    this.recipeSelected.emit();
  }
}
