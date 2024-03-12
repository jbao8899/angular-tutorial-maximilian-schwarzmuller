import { NgModule } from "@angular/core";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { LoggingService } from "./logging.service";

@NgModule({
    // You could also just have the providers array in AppModule
    providers: [
        // Need this here, so one instance of this is shared in all places.
        //Won't have recipes disappear when you go to shopping list page
        // Services only need to be listed here, not in other modules
        RecipeService,
        ShoppingListService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
        // @Injectable({ providedIn: "root" }) is equivalent to putting it here in most cases,
        // though HTTP_INTERCEPTORS must be included here
        // @Injectable({ providedIn: "root" }) is preferred in most cases

        // services don't need to be exported

        // LoggingService // Same as providing this in AppModule or using @Injectable({ providedIn: "root" })
    ],
})
export class CoreModule {

}