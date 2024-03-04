import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject, catchError, map, tap, throwError } from "rxjs";

@Injectable({providedIn: "root"})
export class PostsService {
    postsUrl: string = "https://angular-tutorial-backend-c6999-default-rtdb.firebaseio.com/posts.json";
    error: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) { }
    
    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};

        // If the component does not care about the results of the request,
        // you do not need to return the observable here and subscribe to it there
        this.http.post<{ name: string }>(
            this.postsUrl,
            postData,
            {
                // 'body' is default, will extract response body into JavaScript object
                // 'response' gets you the whole HttpResponse object, including status code, status text,
                // headers, body, etc. 
                observe: 'response'
            }
        )
            .subscribe(
                (responseData) => {
                    // must subscribe to actually make the request
                    // Unsubscribing is unnecessary
                    console.log(responseData);

                    // Can do this to get body if we are doing observe: 'response' above
                    // console.log(responseData.body);
                },
                (error) => {
                    // Use subject to handle errors in cases where you don't return the observable
                    // to the component
                    this.error.next(error.message);
                }
            );
    }

    fetchPosts() {
        // Can add this type specification to get() -> optional but recommended
        return this.http.get<{ [key: string]: Post }>(
                this.postsUrl,
                {
                    headers: new HttpHeaders({
                        // Can set key-value pairs of headers
                        // Can add as many as we want

                        // This header is not actually used
                        'Custom-Header': 'Hello'
                    }),
                    // This does actually do something, it changes the format in which firebase returns data
                    // You can see it in the Network tab (more whitespace and new lines are added to the Response tab)
                    // equivalent to adding ?print=pretty to the URL
                    // (like: https://angular-tutorial-backend-c6999-default-rtdb.firebaseio.com/posts.json?print=pretty)
                    params: new HttpParams().set('print', 'pretty'),

                    // if you want multiple query parameters, you need to do something like:
                    // let searchParams = new HttpParams();
                    // searchParams = searchParams.append('key1', 'value1');
                    // searchParams = searchParams.append('key2', 'value2');
                    // and then set params: searchParams here
                }
            )
            .pipe(map(
                // Convert the object (dictionary???) we get into a list of objects, one for each post that is retrieved
                // // [key: string] refers to a randomly generated key 
                // {-Nrl5zTRzFbs43lr09Am: {…}, -Nrl6olWJTjWPa6SnoXJ: {…}} -> original output
                (responseData: { [key: string]: Post }) => { 
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) { // Is putting this check within the for loop pointless???
                            // ... is spread operator, essentially unwraps the contents of responseData[key]
                            // Fields of responseData[key] will be fields within the new object, not fields within a sub-object
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }

                    return postsArray;
                }
            ),
            catchError(
                (errorRes) => {
                    // Can do some generic error handling
                    // for instance, notify an analytics server

                    // Pass the error on
                    return throwError(errorRes);
                }
            ));
    }

    clearPosts() {
        return this.http.delete(
            this.postsUrl,
            {
                observe: 'events',
                
                // responseType: 'json' is default, the data in the body of your response will be json, so Angular
                // will parse it into a JavaScript object
                // responseType: 'text' will get you text, and Angular will not try to convert it to a JavaScript object
                // In the HttpResponse object, we will have body: "null"
                // (instead of body: null, which we get for responseType: 'json') 
                // responseType: 'blob' is for files
                responseType: 'json'
            }
        )
            .pipe(tap(
                (event) => {
                    // tap lets you do something and then passes through.
                    console.log(event);

                    if (event.type === HttpEventType.Response) {
                        // check if we got back event type response???
                        console.log(event.body); // is null in this case
                    }
                }
            ));
    }
}