import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
  @Input() event: any;

  constructor() { }

  ngOnInit(): void {
    
  }

}
