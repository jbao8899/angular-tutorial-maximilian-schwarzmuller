import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoggingService } from "../logging.service";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        FormsModule,
        // Only have one route, so don't make a separate module for the routing
        // Set path to "" instead of "shopping-list" to use lazy loading
        RouterModule.forChild([{ path: "", component: ShoppingListComponent }]),
        SharedModule
    ],
    providers: [
        // This lazily-loaded module will get its own instance of this dummy service
        // Usually don't want to do this, unless you specifically need a separate instance here
        // Buggy -> importing this both in lazily-loaded and eagerly loaded modules, end up
        // not using the same instance of the service in all places
        // Prefer providing in AppModule or via @Injectable({providedIn: 'root'})
        LoggingService
    ]
})
export class ShoppingListModule {

}