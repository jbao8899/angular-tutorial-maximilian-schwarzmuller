import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: {id: number, name: string};

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.user = {
            id: this.route.snapshot.params['id'],
            name: this.route.snapshot.params['name']
        };
        
        // Pay attention to if parameters change, so you can change what is displayed if
        // the specified user changes
        // If you know you will only reach a page from other pages (so it will be recreated each time),
        // you do not need to subscribe. Otherwise, you do
        this.route.params.subscribe(
            (params: Params) => {
                this.user.id = params.id;
                this.user.name = params.name;
            } // Execute this function whenever the parameters change
        );
    }

}
