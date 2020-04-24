import { Component, Output, EventEmitter, Input } from '@angular/core';

import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent {
  @Input() selectedEventId: number;
  @Output() eventSelect = new EventEmitter();

  list: any;

  constructor(private data: DataService) {
    this.list = this.data.getList();
  }

  selectEvent(eventId: number): void {
    this.eventSelect.emit(eventId);
  }
}
