import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

// https://angular.io/guide/understanding-communicating-with-http MAY BE HELPFUL

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    loadedPosts: Post[] = [];
    isFetching: boolean = false;
    error = null;
    errorSub: Subscription;

    constructor(
        private http: HttpClient,
        private postsService: PostsService
    ) {

    }

    ngOnInit() {
        this.errorSub = this.postsService.error.subscribe(
            (errorMessage) => {
                this.error = errorMessage;
            }
        );
        this.fetchPosts();
    }

    ngOnDestroy(): void {
        this.errorSub.unsubscribe();
    }

    // https://angular-tutorial-backend-c6999-default-rtdb.firebaseio.com/

    onCreatePost(postData: Post) {
        // Send Http request
        // console.log(postData);

        // postData will be converted to a JSON
        // Can add this type specification to post() -> optional but recommended.
        // We get back an object with a single field, called "name", that contains a string (the key for the posted object?)
        // this.http.post<{ name: string }>("https://angular-tutorial-backend-c6999-default-rtdb.firebaseio.com/posts.json", postData)
        //     .subscribe(
        //         (responseData) => {
        //             // must subscribe to actually make the request
        //             // Unsubscribing is unnecessary
        //             console.log(responseData);
        //         }
        //     );
        
        // Don't want to do heavy lifting inside component
        this.postsService.createAndStorePost(postData.title, postData.content);
    }

    onFetchPosts() {
        // Send Http request
        this.fetchPosts();
    }

    onClearPosts() {
        // Send Http request

        this.postsService.clearPosts()
            .subscribe(
                () => {
                    // nothing is returned by deleting, but we want to clear the local array

                    this.loadedPosts = [];
                }
            );
    }

    onHandleError() {
        this.isFetching = false;
        this.error = null;
    }

    private fetchPosts() {
        this.isFetching = true;

        // Handle results in the component, but do the HTTP request
        // in a service
        this.postsService.fetchPosts()
            .subscribe(
                (responseData) => {
                    // console.log(responseData);
                    
                    this.loadedPosts = responseData;
                    this.isFetching = false;
                },
                (error) => {
                    // Triggers if you set ".read": false in Firebase rules
                    this.error = error.message;
                    console.log(error);
                }
            )

        // // Don't want to do heavy lifting inside component
        // // Can add this type specification to get() -> optional but recommended
        // this.http.get<{ [key: string]: Post }>("https://angular-tutorial-backend-c6999-default-rtdb.firebaseio.com/posts.json")
        //     .pipe(map(
        //         // Convert the object we get into a list of objects, one for each post that is retrieved
        //         // // [key: string] refers to a randomly generated key 
        //         // {-Nrl5zTRzFbs43lr09Am: {…}, -Nrl6olWJTjWPa6SnoXJ: {…}} -> original output
        //         (responseData: { [key: string]: Post }) => { 
        //             const postsArray: Post[] = [];
        //             for (const key in responseData) {
        //                 if (responseData.hasOwnProperty(key)) { // Is putting this check within the for loop pointless???
        //                     // ... is spread operator, essentially unwraps the contents of responseData[key]
        //                     // Fields of responseData[key] will be fields within the new object, not fields within a sub-object
        //                     postsArray.push({ ...responseData[key], id: key });
        //                 }
        //             }

        //             return postsArray;
        //         }
        //     ))
        //     .subscribe(
        //         (responseData) => {
        //             // console.log(responseData);
        //             this.loadedPosts = responseData;
        //             this.isFetching = false;
        //         }
        //     );
    }
}
