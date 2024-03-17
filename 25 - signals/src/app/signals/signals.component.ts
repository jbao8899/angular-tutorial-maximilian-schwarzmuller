import { NgFor } from '@angular/common';
import { Component, OnInit, computed, effect, signal } from '@angular/core';

// This is the same as DefaultComponent, but it uses signals to display stuff
// This tutorial was designed when signals were in development, so it is not complete
// Signals usage will be different now

@Component({
    selector: 'app-signals',
    templateUrl: './signals.component.html',
    standalone: true,
    imports: [NgFor],
})
export class SignalsComponent implements OnInit {
    actions = signal<string[]>([]);
    // actions = [];
    counter = signal<number>(0);
    doubleCounter = computed(
        () => {
            // computed() lets you create values that depend on other signal values
            return this.counter() * 2;
        }
    );

    constructor() {
        // effect() executes the function inside whenever one of the signals inside changes
        // It can only be called in a small number of places, including the constructor()
        // It cannot be called in ngOnInit()
        effect(
            () => {
                console.log(this.counter());
            }
        );
    }

    ngOnInit(): void {

    }

    increment() {
        // this.counter.update(
        //     (oldCounter) => {
        //         return oldCounter + 1;
        //     }
        // );
    
        // Equivalent to set(). mutate() was removed.
        this.counter.set(this.counter() + 1);

        // mutate() would let you change this in-place, but it no longer exists
        this.actions.update(
            (actions) => {
                return [...actions, "INCREMENT"];
            }
        );
    }

    decrement() {
        // this.counter.update(oldCounter => oldCounter - 1);

        // Equivalent to set(). mutate() was removed.
        this.counter.set(this.counter() - 1);

        // mutate() would let you change this in-place, but it no longer exists
        this.actions.update(
            (actions) => {
                return [...actions, "DECREMENT"];
            }
        );
    }
}
