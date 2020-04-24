import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data/data.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  events: any;

  constructor(private data: DataService) {
    this.events = this.data.getEvents();
  }

  ngOnInit(): void {
    
  }

}
