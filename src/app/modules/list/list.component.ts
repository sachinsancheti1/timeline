import { Component } from '@angular/core';

import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  events: any;

  constructor(private data: DataService) {
    this.events = this.data.getEvents();
  }

  displayEvent($event: any): void {
    let el = document.getElementById('event_' + $event);
    el.scrollIntoView({behavior:"smooth"});
  }
}
