import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    genders = ['male', 'female'];
    signupForm: FormGroup;
    assignmentForm: FormGroup;
    forbiddenUsernames = ['Chris', 'Anna'];

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            'userData': new FormGroup({
                // 'username': new FormControl(null, Validators.required),

                // You must bind this, as forbiddenNames will not be called within this class
                 // nonNullable: true means this will get set to the default value when the form is reset
                'username': new FormControl('defaultUser', {nonNullable: true, validators: [Validators.required, this.forbiddenNames.bind(this)]}),
                'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails.bind(this)]),    
            }),
            'gender': new FormControl('male', {nonNullable: true}),
            'hobbies': new FormArray([])
        });

        // Print new value whenever you change something.
        // Can also be run on individual fields
        // this.signupForm.valueChanges.subscribe(
        //     (value) => {
        //         console.log(value);
        //     }
        // );

        // // Prints VALID, INVALID, and PENDING (when you change email and it has to wait to see if the value is valid)
        // this.signupForm.statusChanges.subscribe(
        //     (status) => {
        //         console.log(status);
        //     } 
        // )

        // Pre-populate all fields
        // this.signupForm.setValue({
        //     'userData': {
        //         'username': 'Max',
        //         'email': 'max@test.com'
        //     },
        //     'gender': 'male',
        //     'hobbies': []
        // });

        // Pre-populate one value
        this.signupForm.patchValue({
            'userData': {
                'email': 'testing@test.com'
            }
        });

        this.assignmentForm = new FormGroup({
            'project-name': new FormControl(null, [Validators.required, /*CustomValidators.synchronousForbiddenProjectNames*/], [CustomValidators.asynchronousForbiddenProjectNames]),
            'email-assignment': new FormControl(null, [Validators.required, Validators.email]),
            'project-status': new FormControl('critical')    
        });

    }

    onSubmit() {
        // We always have access to the form in reactive forms
        console.log(this.signupForm);

        // this.signupForm.reset(); // Prints default values???
    }

    onAddHobby() {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.signupForm.get('hobbies')).push(control)
    }

    getControls() {
        return (<FormArray>this.signupForm.get('hobbies')).controls;
    }

    // Returns a key value pair, where key is a string and value is a boolean
    // like {nameIsForbidden: true}
    forbiddenNames(control: FormControl): {[s:string]: boolean} {
        if (this.forbiddenUsernames.indexOf(control.value) != -1) {
            return {nameIsForbidden: true};
        }
        else {
            // If validation is successful, you do not return {nameIsForbidden: false}
            // You must return null or nothing in that case
            return null;
        }
    }

    // Asynchronous validator, will trigger 1.5 seconds after test@test.com is entered as the email address
    forbiddenEmails(control: FormControl) : Promise<any> | Observable<any> {
        const promise = new Promise<any>(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        if (control.value == "test@test.com") {
                            resolve({emailIsForbidden: true})
                        }
                        else {
                            resolve(null);
                        }
                    },
                    1500 // 1.5 seconds
                ); 
            }
        );

        return promise;
    }

    onSubmitAssignment() {
        // We always have access to the form in reactive forms
        console.log(this.assignmentForm);
    }
}
