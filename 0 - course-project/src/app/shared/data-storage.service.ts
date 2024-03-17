import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'}) // Instead of doing "providedIn: 'root'", we could instead add this to the providers array in app.module.ts
export class DataStorageService {
    constructor(
        private authService: AuthService,
        private http: HttpClient,
        private recipeService: RecipeService
    ) {
        
    }

    recipesUrl: string = "https://recipe-book-project-backend-default-rtdb.firebaseio.com/recipes.json";

    StoreRecipes() {
        const recipes = this.recipeService.getRecipes();

        // For Firebase, put() gets rid of the data that is already there and replaces it with your new stuff
        // Firebase does not randomly generate IDs for data that you PUT
        this.http.put(this.recipesUrl, recipes)
            .subscribe(
                (response) => {
                    console.log(response)
                }
            )
    }

    FetchRecipes() {
        return this.http.get<Recipe[]>(
            this.recipesUrl
        )
        .pipe(
            map(
                (recipes) => {
                    return recipes.map(
                        recipe => {
                            // Basically, we unwrap each recipe that we get, and if it has null as its ingredients
                            // array, we set the ingredients array to []
                            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                        }
                    )
                }
            ),
            tap(
                (recipes) => {
                    this.recipeService.setRecipes(recipes);
                }
            )
        );

        // pipe(take(1)): Take 1 value from observable, then unsubscribe
        // return this.authService.user.pipe(
        //     take(1),
        //     exhaustMap(
        //         (user) => {
        //             // Exhaustmap will replace the outside observable with the one here
        //             // Why can't we just get the key and save it as a local variable????

        //             return this.http.get<Recipe[]>(
        //                 this.recipesUrl,
        //                 { params: new HttpParams().set('auth', user.token) }
        //             )
        //         }
        //     ),
        //     map(
        //         (recipes) => {
        //             return recipes.map(
        //                 recipe => {
        //                     // Basically, we unwrap each recipe that we get, and if it has null as its ingredients
        //                     // array, we set the ingredients array to []
        //                     return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        //                 }
        //             )
        //         }
        //     ),
        //     tap(
        //         (recipes) => {
        //             this.recipeService.setRecipes(recipes);
        //         }
        //     )
        // );


        // return this.http.get<Recipe[]>(this.recipesUrl)
        //     .pipe(
        //         map(
        //             (recipes) => {
        //                 return recipes.map(
        //                     recipe => {
        //                         // Basically, we unwrap each recipe that we get, and if it has null as its ingredients
        //                         // array, we set the ingredients array to []
        //                         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        //                     }
        //                 )
        //             }
        //         ),
        //         tap(
        //             (recipes) => {
        //                 this.recipeService.setRecipes(recipes);
        //             }
        //         )
        //     );
            // .subscribe(
            //     (recipes) => {
            //         // console.log(recipes);

            //         this.recipeService.setRecipes(recipes);
            //     }
            // );

        return;
    }
}