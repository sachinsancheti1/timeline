import { Component, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent {
  @Output() eventSelect = new EventEmitter();

  list: any;

  currentEventId: number;

  constructor(private data: DataService) {
    this.list = this.data.getList();
    this.selectEvent(this.list[0].events[0].id);
  }

  selectEvent(eventId: number): void {
    this.currentEventId = eventId;
    this.eventSelect.emit(eventId);
  }
}
