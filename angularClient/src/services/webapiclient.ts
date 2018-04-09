import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
    .set("Content-Type", "application/json");

@Injectable()
export class WebApiClient {

    constructor(private http: HttpClient) {

    }

    Get(url: string): Promise<any> {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.http.get(url)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }
}