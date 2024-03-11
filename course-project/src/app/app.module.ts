import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        HeaderComponent,
        LoadingSpinnerComponent,
        ShoppingListComponent,
        ShoppingEditComponent,
        DropdownDirective,
        AlertComponent,

        PlaceholderDirective
    ],
    imports: [
        // BrowserModule can only be imported once, in AppModule
        // Use CommonModule elsewhere
        BrowserModule, 
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RecipesModule,

        AppRoutingModule
    ],
    providers: [
        // Need this here, so one instance of this is shared in all places.
        //Won't have recipes disappear when you go to shopping list page
        // Services only need to be listed here, not in other modules
        RecipeService,
        ShoppingListService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
        // @Injectable({ providedIn: "root" }) is equivalent to putting it here???
    ],
    // What component is available in index.html. Typically only one component is put here
    // Rarely, there may be multiple
    bootstrap: [AppComponent]
})
export class AppModule { }
