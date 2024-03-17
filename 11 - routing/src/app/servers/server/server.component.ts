import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
    server: {id: number, name: string, status: string};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private serversService: ServersService) { }

    ngOnInit() {
        // USING PARAMS:

        // console.log(typeof(this.route.snapshot.params['id'])); // Is a string, will not match on ===
        // console.log(this.serversService.getServers());
        // this.server = this.serversService.getServer(Number(this.route.snapshot.params['id']));

        // // allow changes
        // this.route.params.subscribe(
        //     (params: Params) => {
        //         this.server = this.serversService.getServer(Number(params['id']));
        //     }
        // );

        this.route.data.subscribe(
            (data: Data) => {
                // { path: ':id', component: ServerComponent, resolve: { server: ServerResolver} }
                // Must match the name "server"
                this.server = data.server;
            }
        );
    }

    onEdit() {
        this.router.navigate(
            ['edit'],
            {
                relativeTo: this.route,
                // Keep query parameters from the server page. merge would merge the old ones with the new ones (no new ones are present here)
                queryParamsHandling: 'preserve' 
            }
        );
    }
}
