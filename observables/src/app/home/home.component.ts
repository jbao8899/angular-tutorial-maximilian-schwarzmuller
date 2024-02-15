import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription, filter, interval, map } from 'rxjs'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    private firstObsSubscription: Subscription;

    constructor() { }

    ngOnInit() {
        // interval(1000) is an observable, so you can subscribe to it
        // outputs 1, 2, 3, 4, ...
        // Get a new number every second
        // Continues working if you leave this page
        // If you go back to the home, a second observable is created, both will count simultaneously
        // unless you unsubscribe from the observable (perhaps in ngOnDestroy())
        // this.firstObsSubscription = interval(1000).subscribe(
        //     count => {
        //         console.log(count);
        //     }
        // );

        // In practice, you rarely make your own observables
        // They emit data, errors, and completion, which you can handle
        const customIntervalObservable = new Observable(
            observer => {
                let count = 0;
                setInterval(
                    () => {
                        observer.next(count); // Emit a new value

                        if (count == 2) {
                            observer.complete();
                        }

                        // if (count > 3) {
                        //     // Creating an error, cancelling the observable
                        //     observer.error(new Error("count is greater than 3."));
                        // }

                        count++;
                    },
                    1000
                )
            }
        )

        customIntervalObservable.pipe(map(
            (data: number) => {
                return "Round " + (data + 1);
            }
        ));

        this.firstObsSubscription = customIntervalObservable
        .pipe(
            // This is an operator. They operate on observables. 
            // They modify the outputs of the observable before they reach the observer
            // You need them for observables that are provided by Angular and libraries
            filter(
                (data: number) => {
                    return (data > 0); // So we start with Round 2
                }
            ),
            map(
                (data: number) => {
                    return "Round " + (data + 1);
                }
            )
        )
        .subscribe(
            data => {
                console.log(data);
            },
            error => {
                alert(error.message);
            },
            () => {
                console.log("Completed");
            }
        );
    }

    // You don't need to unsubscribe if the observable has an error or completes
    ngOnDestroy(): void {
        // This is done automatically for things like params that are provided by Angular
        this.firstObsSubscription.unsubscribe();
    }
}
