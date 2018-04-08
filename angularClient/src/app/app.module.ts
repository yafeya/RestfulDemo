import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import * as Components from '../components/index';
import * as Services from '../services/index';

@NgModule({
    declarations: [
        AppComponent,
        Components.ItemListComponent
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [
        Services.HttpClient
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }