import { Component, Output, EventEmitter, Input, Renderer2, ElementRef, HostListener } from '@angular/core';

import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent {
  @Input() selectedEventId: number;
  @Output() eventSelect = new EventEmitter();

  list: any;

  constructor(private data: DataService, private renderer: Renderer2, private el: ElementRef) {
    this.list = this.data.getList();
  }

  selectEvent(eventId: number): void {
    this.eventSelect.emit(eventId);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let screenHeight: number = window.innerHeight;
    let pageHeight: number = document.documentElement.scrollHeight;
    let percentage: number = window.pageYOffset / (pageHeight - screenHeight);

    let margin: number = Math.round(screenHeight * 0.2);
    let start: number = margin;
    let end: number = - this.el.nativeElement.querySelector('.list-container').offsetHeight + screenHeight - 2 * margin;
    let top: number = Math.round(end * percentage + start);

    this.renderer.setStyle(this.el.nativeElement.querySelector('.list-container'), 'top', `${top}px`);
  }
}
