import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(setName: string,
        setDescription: string,
        setImagePath: string,
        setIngredients: Ingredient[]) {

        this.name = setName;
        this.description = setDescription;
        this.imagePath = setImagePath;
        this.ingredients = setIngredients;
    }


}