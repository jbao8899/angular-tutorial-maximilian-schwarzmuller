import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode: boolean = false;

    constructor(
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = params['id'];
                this.editMode = params['id'] != null; // True if there is an ID in the params
                // console.log(this.editMode);
            }
        )
    }
}
