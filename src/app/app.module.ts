import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataService } from './data/data.service';

import { ListComponent } from './modules/list/list.component';
import { EventsListComponent } from './modules/list/events-list/events-list.component';
import { EventComponent } from './modules/list/event/event.component';

import { LightboxComponent } from './modules/lightbox/lightbox.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EventsListComponent,
    EventComponent,
    LightboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LazyLoadImageModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
