import { Component } from '@angular/core';

// Each component should have its own folder

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        .online {
            color: white
        }
    `]
})
export class ServerComponent {
    serverId = 10;
    serverStatus: string;

    constructor() {
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    getServerStatus() {
        return this.serverStatus;
    }

    getColor() {
        if (this.serverStatus == 'online') {
            return 'green';
        }
        else {
            return 'red';
        }
    }
}