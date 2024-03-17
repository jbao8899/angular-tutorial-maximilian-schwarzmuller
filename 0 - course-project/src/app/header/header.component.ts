import { Component, OnDestroy, /*, EventEmitter, Output*/ 
OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

// It would be acceptable to put this directly into the app folder, instead of into its own folder
@Component({
    selector: 'app-header', 
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy, OnInit {
    collapsed = true;
    userSub: Subscription;
    isAuthenticated: boolean = false;
    
    // No longer needed when we use routing
    // @Output() pageSelection = new EventEmitter<string>();

    // onSelect(page : string) {
    //     this.pageSelection.emit(page);
    // }

    constructor(
        private authService: AuthService,
        private dataStorageService: DataStorageService
    ) {

    }

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(
            (user) => {
                if (user) {
                    // have a user
                    this.isAuthenticated = true;
                }
                else {
                    this.isAuthenticated = false;
                }

                // Could use !! user instead
            }
        );
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        this.dataStorageService.StoreRecipes();
    }

    onFetchData() {
        this.dataStorageService.FetchRecipes().subscribe()
    }

    onLogOut() {
        this.authService.logOut();
    }
}
  