import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger(
            "divState",
            [
                state(
                    'normal',
                    style({
                        backgroundColor: 'red',
                        transform: 'translateX(0)'
                    })
                ),
                state(
                    'moved-and-blue',
                    style({
                        'background-color': 'blue',
                        'transform': 'translateX(100px)'
                    })
                ),

                // Will move and change color over the course of a specified number of milliseconds
                // transition("normal => moved-and-blue", animate(300)),
                // transition("moved-and-blue => normal", animate(800)),

                // bidirectional
                transition("normal <=> moved-and-blue", animate(300)),
            ]
        ),
        trigger(
            'wildState',
            [
                state('normal', style({
                    'background-color': 'red',
                    transform: 'translateX(0) scale(1)',
                    borderRadius: 0
                })),
                state('moved-and-blue', style({
                    'background-color': 'blue',
                    transform: 'translateX(100px) scale(1)',
                    borderRadius: 0
                })),
                state('shrunken', style({
                    'background-color': 'green',
                    transform: 'translateX(50px) scale(0.5)',
                    borderRadius: 0
                })),
                transition('normal => moved-and-blue', animate(300)),
                transition('moved-and-blue => normal', animate(800)),
                transition('shrunken <=> *', [
                    style({
                        // Do this immediately
                        'background-color': 'orange'
                    }),
                    // Make the border radius over the course of a second
                    animate(1000, style({
                        borderRadius: '50px'
                    })),
                    // Transition to the end state
                    animate(500)
                ])
            ]
        ),
        trigger(
            "list1",
            [
                state(
                    'in',
                    style({
                        opacity: 1
                    })
                ),
                transition(
                    // void means that this element has not been added yet
                    "void => *",
                    [
                        style({
                            // starting style
                            opacity: 0,
                            transform: "translateX(-100px)"
                        }),
                        animate(300)
                    ]
                ),
                transition(
                    // void means that this element has not been added yet
                    "* => void",
                    animate(
                        300,
                        style({
                            transform: "translateX(100px)",
                            opacity: 0
                        })
                    )
                ),
            ]
        ),
        trigger(
            "list2",
            [
                state(
                    'in',
                    style({
                        opacity: 1
                    })
                ),
                transition(
                    // void means that this element has not been added yet
                    "void => *",
                    [
                        // KEYFRAMES
                        animate(
                            1000,
                            keyframes([
                                // By default, every style increment gets an even share of time
                                // The offset property lets you change this
                                style({
                                    transform: "translateX(-100px)",
                                    opacity: 0,
                                    // offset: 0
                                }),
                                style({
                                    transform: "translateX(-50px)",
                                    opacity: 0.5,
                                    // offset: 0.3
                                }),
                                style({
                                    transform: "translateX(-20px)",
                                    opacity: 1,
                                    // offset: 0.8
                                }),
                                style({
                                    transform: "translateX(0px)",
                                    opacity: 1,
                                    // offset: 1
                                }),
                            ])
                        )
                    ]
                ),
                transition(
                    // void means that this element has not been added yet
                    "* => void",
                    group([
                        // Do the animations inside the group at the same time
                        animate(
                            800,
                            style({
                                transform: "translateX(100px)",
                                opacity: 0
                            })
                        ),
                        animate(
                            300,
                            style({
                                color: "red"
                            })
                        )
                    ])
                ),
            ]
        ),
    ]
})
export class AppComponent {
    list = ['Milk', 'Sugar', 'Bread'];
    state: string = "normal";
    wildState: string = "moved-and-blue";

    onAdd(item) {
        this.list.push(item);
    }

    onDelete(i) {
        this.list.splice(i, 1);
    }

    onAnimate() {
        if (this.state == "normal") {
            this.state = "moved-and-blue";
        }
        else {
            this.state = "normal";
        }

        if (this.wildState == "normal") {
            this.wildState = "moved-and-blue";
        }
        else {
            this.wildState = "normal";
        }
    }

    onShrink() {
        this,this.wildState = "shrunken";
    }

    animationStarted(event) {
        console.log(event);
    }

    animationEnded(event) {
        console.log(event);
    }
}
