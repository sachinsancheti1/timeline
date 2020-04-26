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

  lightboxEventId: number = -1;
  lightboxImageI: number = -1;

  constructor(private data: DataService) {
    this.events = this.data.getEvents();
    this.selectedEventId = this.events[0].id;
  }

  displayEvent(eventId: number): void {
    this.selectedEventId = eventId;
    let el = document.getElementById('event_' + eventId);
    el.scrollIntoView({behavior:"smooth"});
  }

  openLightbox($event: any): void {
    this.lightboxEventId = $event.eventId;
    this.lightboxImageI = $event.imageI;
  }

  lightboxClosed(): void {
    this.lightboxEventId = -1;
    this.lightboxImageI = -1;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let margin: number = Math.floor(window.innerHeight * 15 / 100);

    for(let i=0; i<events.length; i++) {
      let el = document.getElementById('event_' + events[i].id);

      // If event fills 50% or more of the scree
      if(el.offsetTop > window.pageYOffset + Math.round(window.innerHeight * 0.5)) {
        if(i > 0) {
          this.selectedEventId = events[i - 1].id;
        } else {
          this.selectedEventId = events[i].id;
        }
        break;
      } else if(i == events.length - 1) {
        this.selectedEventId = events[i].id;
      }
    }
  }
}
