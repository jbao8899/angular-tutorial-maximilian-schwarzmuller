import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-edit-server',
    templateUrl: './edit-server.component.html',
    styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
    server: {id: number, name: string, status: string};
    serverName = '';
    serverStatus = '';
    allowEdit = false;
    changesSaved = false;

    constructor(
        private route: ActivatedRoute,
        private serversService: ServersService,
        private router: Router) { }

    ngOnInit() {
        // console.log(this.route.snapshot.queryParams);
        // console.log(this.route.snapshot.fragment);

        // console.log(this.route.snapshot.params);

        // console.log(this.route.snapshot.params['id'])

        // console.log("EditServerComponent -> ngOnInit()");

        const id = Number(this.route.snapshot.params['id']);

        // console.log(id);

        this.server = this.serversService.getServer(id);

        // console.log(this.server);

        this.serverName = this.server.name;
        this.serverStatus = this.server.status;

        this.route.queryParams.subscribe(
            (queryParams: Params) => {
                this.allowEdit = (queryParams['allowEdit'] === '1' ? true : false);
            }
        );

        this.route.params.subscribe(
            (params: Params) => {
                this.server = this.serversService.getServer(Number(params['id']));
            }            
        );
    }

    onUpdateServer() {
        this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
        this.changesSaved = true;
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    // Check if we are allowed to leave
    // This is run whenever the CanDeactivateGuard is invoked by the router
    canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {

        // console.log("EditServerComponent canDeactivate()");
        // console.log(this.serverName);
        // console.log(this.serverStatus);
        // console.log(this.server);
        // console.log(this.changesSaved);

        if (!this.allowEdit) {
            // We can't edit this, so we can leave whenever we want
            // console.log("1st branch");
            return true;
        }
        else if (
            (this.serverName != this.server.name || this.serverStatus != this.server.status) &&
            !this.changesSaved) {
            // Changed something without saving
            // console.log("2nd branch");
            return confirm("Do you want to discard the changes?");
        }
        else {
            // Nothing was changed, or changes have been saved
            // console.log("3rd branch");
            return true;
        }
    }
}
