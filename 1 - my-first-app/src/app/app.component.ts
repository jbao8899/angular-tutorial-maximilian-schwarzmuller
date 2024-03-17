import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // start with app.component.html
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  // Can have style in-line or in a separate file. Maybe use a separate file if you have a lot to write
  // styles: [`
  //   h3 { color: purple }
  // `]  
})
export class AppComponent {
  title = 'My First App';
  name = 'Jeremy';
  username = '';

  displayDetails = false;
  numDetailsButtonPresses = 0;

  // Using two separate lists for formatted and unformatted datetime entries
  // detailsButtonPressTimestamps = []
  // coloredDetailsButtonPressTimestamps = []

  detailsButtonPressTimestamps = []

  onDisplayDetails() {
    this.displayDetails = !this.displayDetails;
    this.numDetailsButtonPresses++;

    // Not using index
    // this.detailsButtonPressTimestamps.push([new Date(), this.numDetailsButtonPresses])
    this.detailsButtonPressTimestamps.push(new Date());

    // Using two separate lists for formatted and unformatted datetime entries
    // if (this.numDetailsButtonPresses <= 4) {
    //   this.detailsButtonPressTimestamps.push(new Date());
    // }
    // else {
    //   this.coloredDetailsButtonPressTimestamps.push(new Date());
    // }
  }
}
