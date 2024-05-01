import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule
        ],
        declarations: [
            AppComponent
        ],
        }).compileComponents();
    });

    // Each block is run separately, after beforeEach() (so beforeEach(), first test case, beforeEach(), second test case, etc.)
    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy(); // ap exists
    });

    it(`should have as title '30-unit-testing'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('30-unit-testing');
    });

    it("should render title", () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges(); // App many not contain anything until we do this??
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Hello, 30-unit-testing');
    });
});
