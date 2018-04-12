import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Services from '../../services/index';
import * as Models from '../../models/index';

@Component({
    selector: 'item-list',
    templateUrl: 'itemlist.component.html',
    styleUrls: ['itemlist.component.scss']
})
export class ItemListComponent implements OnInit {

    private mUsers: any[] = [];
    private mSelectedUser: Models.User = new Models.User();
    private mSelectedRow: number;

    constructor(private httpClient: Services.HttpClient) {

    }

    ngOnInit(): void {
    }

    get Users(): any[] {
        return this.mUsers;
    }

    get SelectedUser(): Models.User {
        return this.mSelectedUser;
    }

    get SelectedRow(): number {
        return this.mSelectedRow;
    }

    async GetUsers() {
        let data = await this.httpClient.Get('http://localhost:8080/getUserList');
        for (let item in data) {
            let raw = data[item];
            let user = new Models.User();
            user.Id = raw.id;
            user.Name = raw.name;
            user.Password = raw.password;
            user.Profession = raw.profession;
            this.mUsers.push(user);
        }
    }

    async UpdateSelected() {
        await this.httpClient.Post('http://localhost:8080/updateUser', this.mSelectedUser);
    }

    OnSelect(user: Models.User, row: number): void {
        this.mSelectedUser.Id = user.Id;
        this.mSelectedUser.Name = user.Name;
        this.mSelectedUser.Password = user.Password;
        this.mSelectedUser.Profession = user.Profession;
        this.mSelectedRow = row;
    }
}
