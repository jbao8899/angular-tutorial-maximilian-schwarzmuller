import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {
    // moving out custom validators for the assignment
    static synchronousForbiddenProjectNames(control: FormControl): {[s:string]: boolean} {
        if (control.value == "test") {
            return {nameIsForbidden: true};
        }
        else {
            return null;
        }
    }

    static asynchronousForbiddenProjectNames(control: FormControl) : Promise<any> | Observable<any> {
        const promise = new Promise<any>(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        if (control.value == "test") {
                            resolve({nameIsForbidden: true})
                        }
                        else {
                            resolve(null);
                        }
                    },
                    1000 // 1 second
                ); 
            }
        );

        return promise;
    }

}