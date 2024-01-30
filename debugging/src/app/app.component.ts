import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers; 

  onAddServer() {
    // This causes the issue. "this.servers" needs to be an array to push to it
    this.servers.push('Another Server'); 
  }

  // You can delete servers by clicking on them (if you fix the issue where "servers" is undefined)
  // However, clicking on the last server does nothing
  // position should not be "id + 1", but just "id" (it is pretty redundant)
  // This code currently deletes the entry after the one you clicked on
  onRemoveServer(id: number) {
    const position = id + 1;
    this.servers.splice(position, 1); // splice is for deletion from arrays
  }
}
