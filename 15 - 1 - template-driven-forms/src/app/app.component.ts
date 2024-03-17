import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('f') signupForm: NgForm; // alternative approach
    defaultQuestion = 'teacher';
    answer = '';
    gender = ['male', 'female'];
    user = {
        username: '',
        email: '',
        secretQuestion: '',
        answer: '',
        gender: ''
    };
    submitted = false;

    defaultSubscriptionAssignment = 'advanced';

    suggestUserName() {
        const suggestedName = 'Superuser';

        // setValue lets you set whole form. Is not the best approach
        // this.signupForm.setValue({
        //     userData: {
        //         username: suggestedName,
        //         email: ''
        //     },
        //     secret: 'pet',
        //     questionAnswer: '',
        //     gender: 'male'
        // });

        this.signupForm.form.patchValue({
            userData: {
                username: suggestedName // Do not override other users
            }
        });
    }

    // onSubmit(form: NgForm) {
    //     console.log(form); // Can see what is entered into form
    // }

    onSubmit() {
        console.log(this.signupForm);

        this.submitted = true;

        this.user.username = this.signupForm.value.userData.username;
        this.user.email = this.signupForm.value.userData.email;
        this.user.secretQuestion = this.signupForm.value.secret;
        this.user.answer = this.signupForm.value.questionAnswer;
        this.user.gender = this.signupForm.value.gender;

        this.signupForm.reset(); // will reset values and state (dirtiness and stuff)
    }

    onSubmitAssignment(form: NgForm) {
        console.log(form);

        // form.reset(); // All values are null if this is called???
    }
}
