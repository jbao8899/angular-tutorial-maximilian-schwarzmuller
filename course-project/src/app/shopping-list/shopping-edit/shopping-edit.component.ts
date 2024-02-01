import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  // Do not write to ViewChild in TypeScript file
  @ViewChild('nameInput', { static: true }) nameInputRef : ElementRef;

  @Output() ingredientToAdd = new EventEmitter<Ingredient>();

  onAddIngredient(setAmount: number) {
    // Can pass local references (#nameInput and #amountInput) as arguments or select them as ViewChild
    // Did it both ways here

    this.ingredientToAdd.emit(
      new Ingredient(this.nameInputRef.nativeElement.value, setAmount));
  }
}
