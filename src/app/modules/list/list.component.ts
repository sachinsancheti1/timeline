import { Component, HostListener, Renderer2 } from '@angular/core';

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

  infoOverlayHidden: boolean = true;
  scrollTopButtonHidden: boolean = true;

  constructor(private data: DataService, private renderer: Renderer2) {
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

  displayInfo(): void {
    this.infoOverlayHidden = false;
    this.renderer.addClass(document.body, 'noscroll');
  }
  hideInfo(): void {
    this.infoOverlayHidden = true;
    this.renderer.removeClass(document.body, 'noscroll');
  }

  scrollTop(): void {
    setTimeout(function(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    }, 100);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let margin: number = Math.floor(window.innerHeight * 15 / 100);

    // Events
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

    // Scroll top button
    if(window.pageYOffset > 300 && this.scrollTopButtonHidden) {
      this.scrollTopButtonHidden = false;
    } else if(window.pageYOffset <= 300 && !this.scrollTopButtonHidden) {
      this.scrollTopButtonHidden = true;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    // When lightbox and info panel aren't opened
    if(this.lightboxEventId == -1 && this.infoOverlayHidden) {
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
    // When lightbox isn't opened
    if(this.lightboxEventId == -1) {
      // i
      if(event.keyCode == 73) {
        this.displayInfo();
      }

      // Esc
      if(event.keyCode == 27) {
        this.hideInfo();
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
