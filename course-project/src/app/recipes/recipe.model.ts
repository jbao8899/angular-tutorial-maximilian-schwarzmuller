export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(setName: string, setDescription: string, setImagePath: string) {
        this.name = setName;
        this.description = setDescription;
        this.imagePath = setImagePath;
    }
}