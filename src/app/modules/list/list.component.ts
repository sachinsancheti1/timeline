import { Component, HostListener } from '@angular/core';

import { DataService } from '../../data/data.service';
import { events } from 'src/app/data/events.store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  events: any;

  selectedEventId: number;

  constructor(private data: DataService) {
    this.events = this.data.getEvents();
    this.selectedEventId = this.events[0].id;
  }

  displayEvent(eventId: number): void {
    this.selectedEventId = eventId;
    let el = document.getElementById('event_' + eventId);
    el.scrollIntoView({behavior:"smooth"});
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any) {
    let margin: number = Math.floor(window.innerHeight * 15 / 100);

    for(let i=0; i<events.length; i++) {
      let el = document.getElementById('event_' + events[i].id);

      // If event is at at least 15% of the screen from top
      if(el.offsetTop > window.pageYOffset + margin) {
        if(i > 0) {
          this.selectedEventId = events[i - 1].id;
        } else {
          this.selectedEventId = events[i].id;
        }
        break;
      }
    }
  }
}
