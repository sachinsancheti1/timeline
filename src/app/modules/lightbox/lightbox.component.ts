import { Component, Input, OnChanges, Output, EventEmitter, Renderer2, HostListener } from '@angular/core';

import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html'
})
export class LightboxComponent implements OnChanges {
  @Input() eventId: number;
  @Input() imageI: number;
  @Output() closed = new EventEmitter();

  event: any;

  active: boolean = false;

  constructor(private data: DataService, private renderer: Renderer2) { }

  ngOnChanges($event: any): void {
    if($event.eventId && $event.eventId.currentValue > -1
        && $event.imageI && $event.imageI.currentValue > -1) {
      this.event = this.data.getEvent(this.eventId);
      if(this.event != null && this.imageI < this.event.images.length) {
        this.renderer.addClass(document.body, 'noscroll');
        this.active = true;
      }
    }
  }

  close(): void {
    this.renderer.removeClass(document.body, 'noscroll');
    this.active = false;
    this.closed.emit();
  }

  browseImage(move: number): void {
    if(move > 0 && this.imageI == (this.event.images.length - 1)) {
      this.imageI = 0;
    } else if(move < 0 && this.imageI == 0) {
      this.imageI = this.event.images.length - 1;
    } else {
      this.imageI += move;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    // When modal is opened
    if(this.active) {
      // Escape key
      if(event.key == 'Escape') {
        this.close();
      }
      // Navigation keys
      // Left key
      if(event.keyCode == 37) {
        this.browseImage(-1);
      }
      // Right key
      if(event.keyCode == 39) {
        this.browseImage(1);
      }
    }
  }
}
