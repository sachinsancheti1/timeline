import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../data/data.service';


@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {
  list: any;

  currentEventId: number;

  constructor(private data: DataService) {
    this.list = this.data.getList();
    this.selectEvent(this.list[0].events[0].id);
  }

  ngOnInit(): void {
    
  }

  selectEvent(eventId: number): void {
    this.currentEventId = eventId;
  }
}
