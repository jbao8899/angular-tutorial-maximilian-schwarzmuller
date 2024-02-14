import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";

// Better to do this in its own file
interface Server {
    id: number,
    name: string,
    status: string
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
    constructor(private serversService: ServersService) { }

    // This executes each time we rerender, so subscribing is not needed
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :
        Observable<Server> | Promise<Server> | Server {
        return this.serversService.getServer(Number(route.params['id']));
    }
}