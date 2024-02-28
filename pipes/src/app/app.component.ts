import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    servers = [
        {
            instanceType: 'medium',
            name: 'Production Server',
            status: 'stable',
            started: new Date(15, 1, 2017)
        },
        {
            instanceType: 'large',
            name: 'User Database',
            status: 'stable',
            started: new Date(15, 1, 2017)
        },
        {
            instanceType: 'small',
            name: 'Development Server',
            status: 'offline',
            started: new Date(15, 1, 2017)
        },
        {
            instanceType: 'small',
            name: 'Testing Environment Server',
            status: 'stable',
            started: new Date(15, 1, 2017)
        }
    ];
    
    // appStatus will be "stable" after 2 seconds
    appStatus = new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve("stable");
            },
            2000)
        }
    ); 

    filteredStatus: string; 

    // If you add stable servers while filtering on "stable", they will not be displayed
    // until you change what is being filtered on
    // The new servers will be displayed if you set "pure: false" on the filter pipe
    // This may have performance penalties 
    onAddServer() {
        this.servers.push({
            instanceType: "small",
            name: "New Server",
            status: 'stable',
            started: new Date(15, 1, 2017)
        });
    }

    getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
        return {
        'list-group-item-success': server.status === 'stable',
        'list-group-item-warning': server.status === 'offline',
        'list-group-item-danger': server.status === 'critical'
        };
    }
}
