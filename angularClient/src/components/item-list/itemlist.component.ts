import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Services from '../../services/index';

@Component({
    selector: 'item-list',
    templateUrl: 'itemlist.component.html',
    styleUrls: ['itemlist.component.scss']
})
export class ItemListComponent implements OnInit {

    private mUsers: any[] = [];

    constructor(private httpClient: HttpClient) {

    }

    ngOnInit(): void {
    }

    get Users(): any[] {
        return this.mUsers;
    }
}