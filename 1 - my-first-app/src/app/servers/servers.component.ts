import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', // Select by element
  // selector: '[app-servers]', // Select by attribute
  // selector: '.app-servers', // Select by class
  templateUrl: './servers.component.html',
  // Below: define template in-line
  // external file is usually better
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>
  //   <app-server></app-server>
  // `, 
  styleUrl: './servers.component.css'
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No server was created.';
  serverName = 'Test Server';
  serverCreated = false;
  servers = ['Test Server 1', 'Test Server 2']

  constructor() {
    setTimeout(
      () => 
      {
        this.allowNewServer = true
      },
      2000
    ) // after 2 seconds, set allowNewServer to true
  }

  onCreateServer() {
    this.serverCreationStatus = 'The server named \"' + this.serverName + '\" was created';
    this.serverCreated = true;
    this.servers.push(this.serverName)
  }

  onUpdateServerName(event: Event) {
    // console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
