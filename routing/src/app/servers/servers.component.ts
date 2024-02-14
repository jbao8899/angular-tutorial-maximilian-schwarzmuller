import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-servers',
    templateUrl: './servers.component.html',
    styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
    public servers: {id: number, name: string, status: string}[] = [];

    constructor(
        private route: ActivatedRoute, // Injecting the currently active route
        private router: Router,
        private serversService: ServersService) { }

    ngOnInit() {
        this.servers = this.serversService.getServers();
    }

    onReload() {
        // this.router.navigate(['/servers']); // Does nothing

        // This does not create an error. Why?
        // routerLink in html knows from where it is called, and using routerLink='servers'
        // wuld take you to http://localhost:4200/servers/servers, which does not exist
        // But this navigate() function does not know where it was called from, by default
        // this.router.navigate(['servers']);

        // Correctly tries to go to http://localhost:4200/servers/servers, causing an error
        // this.router.navigate(['servers'], {relativeTo: this.route});
    }
}
