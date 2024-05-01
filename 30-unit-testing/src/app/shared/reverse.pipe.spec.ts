import { TestBed } from '@angular/core/testing';
import { ReversePipe } from './reverse.pipe';

// Test this pipe here, as it does not depend on any pieces of the Angular 2 app or Angular 2 itself
// This is an isolated test
describe(
    'ReversePipe',
    () => {
        it(
            "should reverse a string correctly",
            () => {
                let reversePipe = new ReversePipe();
                expect(reversePipe.transform("hello")).toEqual("olleh");
            }
        )
    }
);
