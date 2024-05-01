import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

describe(
    'UserComponent',
    () => {
        beforeEach(() =>
            {
                TestBed.configureTestingModule({
                    declarations: [UserComponent]
                }).compileComponents()
            }
        )

        it(
            "should create the user component",
            () => {
                let fixture = TestBed.createComponent(UserComponent);
                let component = fixture.debugElement.componentInstance;
                expect(component).toBeTruthy();
            }
        )
        
        it(
            "should use user name from UserService",
            () => {
                let fixture = TestBed.createComponent(UserComponent);
                let component = fixture.debugElement.componentInstance;
                let userService = fixture.debugElement.injector.get(UserService);
                fixture.detectChanges(); // NEEDED!!!!
                expect(component.user.name).toEqual(userService.user.name);
            }
        );

        it(
            "should display the user's name if they are logged in",
            () => {
                let fixture = TestBed.createComponent(UserComponent);
                let component = fixture.debugElement.componentInstance;
                component.isLoggedIn = true; // Must come before fixture.detectChanges()

                fixture.detectChanges();
                const compiled = fixture.nativeElement as HTMLElement;
                expect(compiled.querySelector("p")?.textContent).toContain(component.user.name)
            }
        );

        it(
            "shouldn't display the user's name if they aren't logged in",
            () => {
                let fixture = TestBed.createComponent(UserComponent);
                let component = fixture.debugElement.componentInstance;
                component.isLoggedIn = false; // Already false, here for clarity

                fixture.detectChanges();
                const compiled = fixture.nativeElement as HTMLElement;
                expect(compiled.querySelector("p")?.textContent).toEqual("Please log in first.")
            }
        );

        it(
            "shouldn't fetch data successfully if not called asynchronously.",
            () => {
                let fixture = TestBed.createComponent(UserComponent);
                let component = fixture.debugElement.componentInstance;
                let dataService = fixture.debugElement.injector.get(DataService);

                let spy = spyOn(dataService, "getDetails") //spyOn() informs us when getDetails() has been called
                    .and.returnValue(Promise.resolve("Data")); // Whenever getDetails() is called, we return Promise.resolve("Data")???? Still asynchronous
                fixture.detectChanges();
                expect(component.data).toBe(undefined);
            }
        )

        it(
            "should fetch data successfully if called asynchronously.",
            async(() => {
                let fixture = TestBed.createComponent(UserComponent);
                let component = fixture.debugElement.componentInstance;
                let dataService = fixture.debugElement.injector.get(DataService);

                let spy = spyOn(dataService, "getDetails")
                    .and.returnValue(Promise.resolve("Data"));
                fixture.detectChanges();
                // Resolves when asynchronous stuff is done
                // And then makes sure that component.data has been set to "Data" in ngOnInit()
                fixture.whenStable()
                    .then(
                        () => {
                            expect(component.data).toBe("Data");
                        }
                    )
            })
        )

        it(
            "should fetch data successfully if called asynchronously (fakeAsync and tick).",
            fakeAsync(() => {
                let fixture = TestBed.createComponent(UserComponent);
                let component = fixture.debugElement.componentInstance;
                let dataService = fixture.debugElement.injector.get(DataService);

                let spy = spyOn(dataService, "getDetails")
                    .and.returnValue(Promise.resolve("Data"));
                fixture.detectChanges();
                // No longer need fixture.whenStable()

                tick(); // finish all asynchronous tasks now
                expect(component.data).toBe("Data");
            })
        )

        // // Default
        // let component: UserComponent;
        // let fixture: ComponentFixture<UserComponent>;

        // beforeEach(async () => {
        //     await TestBed.configureTestingModule({
        //         declarations: [UserComponent]
        //     })
        //     .compileComponents();
            
        //     fixture = TestBed.createComponent(UserComponent);
        //     component = fixture.componentInstance;
        //     fixture.detectChanges();
        // });

        // it('should create the instance', () => {
        //     expect(component).toBeTruthy();
        // });
    }
);
