import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DropdownDirective } from "./dropdown.directive";
import { AlertComponent } from "./alert/alert.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        AlertComponent,

        DropdownDirective,
        PlaceholderDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        LoadingSpinnerComponent,
        AlertComponent,

        DropdownDirective,
        PlaceholderDirective,
        
        CommonModule
    ]
})
export class SharedModule {

}