import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
    id: number;
    editMode: boolean = false;
    recipeForm: FormGroup;
    subscription: Subscription;

    // (<FormArray>this.recipeForm.get('ingredients')).clear();
    // to remove everything from the FormArray

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: Params) => {
                this.id = params['id'];
                this.editMode = params['id'] != null; // True if there is an ID in the params
                // console.log(this.editMode);

                // The thing we are looking at has changed
                this.initForm();
            }
        )
    }

    private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        // Load the values for the recipe being edited if we are in edit mode.
        // Otherwise, we will use empty strings
        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath
            recipeDescription = recipe.description;
            if (recipe['ingredients']) { // check if the recipe has an array of ingredients
                for (let ingredient of recipe.ingredients) {
                    recipeIngredients.push(
                        new FormGroup({
                            'name': new FormControl(ingredient.name, Validators.required),
                            'amount': new FormControl(ingredient.amount, [
                                Validators.required,
                                Validators.min(1) // Or Validators.pattern(/^[1-9]+[0-9]*$/) without quotes
                            ])
                        })
                    );
                }
            }
        }

        this.recipeForm = new FormGroup(
            {
                // These will be an empty string if we are not in edit mode, and 
                // will get the correct values if we are
                'name': new FormControl(recipeName, Validators.required),
                'imagePath': new FormControl(recipeImagePath, Validators.required),
                'description': new FormControl(recipeDescription, Validators.required),
                'ingredients': recipeIngredients
            }
        );
    }

    get controls() { // a getter!
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }      

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                    Validators.required,
                    Validators.min(1) // Or Validators.pattern(/^[1-9]+[0-9]*$/) without quotes
                ])
            })
        );
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    onSubmit() {
        // const newRecipe = new Recipe(
        //     this.recipeForm.value['name'],
        //     this.recipeForm.value['description'],
        //     this.recipeForm.value['imagePath'],
        //     this.recipeForm.value['ingredients']
        // );

        if (this.editMode) {
            // this.recipeService.updateRecipe(this.id, newRecipe);

            // Using form directly?
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        }
        else {
            // this.recipeService.addRecipe(newRecipe);

            // Using form directly?
            this.recipeService.addRecipe(this.recipeForm.value);
        }

        // Go up one level (could also make an onCancel function that does this, instead of 
        // using routerLink in the html)
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe(); // Needed????
    }
}
