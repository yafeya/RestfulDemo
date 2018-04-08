import { Component, OnInit, Inject } from '@angular/core';
import * as Services from '../../services/index';

@Component({
    selector: 'item-list',
    templateUrl: 'itemlist.component.html',
    styleUrls: ['itemlist.component.scss']
})
export class ItemListComponent implements OnInit {

    private mUsers: any[] = [];

    constructor(private httpClient: Services.HttpClient) {

    }

    ngOnInit(): void {
    }

    get Users(): any[] {
        return this.mUsers;
    }

    async GetUsers() {
        let users = await this.httpClient.Get('http://127.0.0.1:8080/getUserList', true);
        if (users != undefined && users != null) {
            for (let user of users) {
                this.mUsers.push(user);
            }
        }
    }
}