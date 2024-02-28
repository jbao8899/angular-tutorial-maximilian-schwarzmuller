import { Component, ElementRef, OnDestroy, OnInit, /*EventEmitter, Output,*/ ViewChild } from '@angular/core';

import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    // Do not write to ViewChild in TypeScript file
    @ViewChild('nameInput', { static: true }) nameInputRef : ElementRef;

    @ViewChild('f', { static: false }) shoppingListForm: NgForm;

    subscription: Subscription;

    areEditingItem: boolean = false;
    indexOfItemBeingEdited: number;
    itemBeingEdited: Ingredient;

    // @Output() ingredientToAdd = new EventEmitter<Ingredient>();

    constructor(
        private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.subscription = this.shoppingListService.startedEditing.subscribe(
            (index: number) => {
                this.areEditingItem = true;
                this.indexOfItemBeingEdited = index;
                this.itemBeingEdited = this.shoppingListService.GetIngredient(this.indexOfItemBeingEdited);
                this.shoppingListForm.setValue({
                    name: this.itemBeingEdited.name,
                    amount: this.itemBeingEdited.amount
                })
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    // Old version, before using form
    // onAddIngredient(setAmount: number) {
    //     // Can pass local references (#nameInput and #amountInput) as arguments or select them as ViewChild
    //     // Did it both ways here

    //     // No longer needed, because we are using a service
    //     // this.ingredientToAdd.emit(
    //     //     new Ingredient(this.nameInputRef.nativeElement.value, setAmount));

    //     this.shoppingListService.AddIngredient(this.nameInputRef.nativeElement.value, setAmount);
    // }

    onAddOrEditIngredient(form: NgForm) {
        if (this.areEditingItem) {
            this.shoppingListService.UpdateIngredient(
                this.indexOfItemBeingEdited,
                new Ingredient(form.value.name, form.value.amount)
            );
        }
        else {
            this.shoppingListService.AddIngredient(form.value.name, form.value.amount);
        }

        // Reset the form after you finish
        this.areEditingItem = false;
        this.shoppingListForm.reset();
    }

    onClear() {
        this.areEditingItem = false;
        this.shoppingListForm.reset();
    }

    onDeleteIngredient() {
        // this.areEditingItem must be true
        this.shoppingListService.DeleteIngredient(this.indexOfItemBeingEdited);

        this.areEditingItem = false;
        this.shoppingListForm.reset();    
    }
}
