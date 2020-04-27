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
    let el = document.getElementById('event_' + eventId);

    setTimeout(function(){
      el.scrollIntoView({behavior:"smooth"});
    }, 100);
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

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    // When modal is opened
    if(this.lightboxEventId == -1) {
      // Navigation keys
      // Arrow up
      if(event.keyCode == 38) {
        event.preventDefault();
        this.displayPreviousEvent();
      }
      // Arrow down
      if(event.keyCode == 40) {
        event.preventDefault();
        this.displayNextEvent();
      }

      // Enter or space
      if(event.keyCode == 13 || event.keyCode == 32) {
        this.openLightbox({
          eventId: this.selectedEventId,
          imageI: 0
        });
      }
    }
  }

  private displayPreviousEvent(): void {
    for(let i=0; i<this.events.length; i++) {
      if(this.events[i].id == this.selectedEventId && i > 0) {
        this.displayEvent(this.events[i - 1].id);
        break;
      }
    }
  }
  private displayNextEvent(): void {
    for(let i=0; i<this.events.length; i++) {
      if(this.events[i].id == this.selectedEventId && i < this.events.length - 1) {
        this.displayEvent(this.events[i + 1].id);
        break;
      }
    }
  }
}
