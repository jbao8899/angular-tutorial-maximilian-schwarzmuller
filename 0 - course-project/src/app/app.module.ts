import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
// import { AuthModule } from './auth/auth.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        // BrowserModule can only be imported once, in AppModule
        // Use CommonModule elsewhere
        BrowserModule, 
        HttpClientModule,

        AppRoutingModule,
        // AuthModule, // Now being loaded lazily
        CoreModule,
        // RecipesModule, // Now being loaded lazily
        SharedModule,
        // ShoppingListModule // Now being loaded lazily
    ],
    providers: [
        // should be in CoreModule, included here for demonstration
        LoggingService
    ],
    // What component is available in index.html. Typically only one component is put here
    // Rarely, there may be multiple
    bootstrap: [AppComponent]
})
export class AppModule { }
