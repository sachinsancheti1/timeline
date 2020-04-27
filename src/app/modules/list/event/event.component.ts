import { Component, OnChanges, Input, Output, EventEmitter, ViewChildren, Renderer2, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnChanges {
  @Input() event: any;
  @ViewChildren('image') images: QueryList<ElementRef>;
  @Output() openLightbox = new EventEmitter();

  imagesList: any;

  loadedImageCount: number = 0;
  eventWidth: number;
  maxImages: number = 4;
  margin: number = 5;

  loaded: boolean = false;

  constructor(private renderer: Renderer2, private el:ElementRef) { }

  ngOnChanges(): void {
    if(this.event.images.length > this.maxImages) {
      this.imagesList = this.event.images.slice(0, 4);
    } else {
      this.imagesList = this.event.images;
    }
  }

  onLoad($event: any): void {
    if(this.eventWidth === undefined) {
      this.eventWidth = this.el.nativeElement.querySelector('.event-container').offsetWidth;
    }

    this.loadedImageCount++;
    if(this.loadedImageCount == this.event.images.length
        || (this.event.images.length > this.maxImages) && this.loadedImageCount == this.maxImages) {
      this.resizeImages();
      this.loaded = true;
    }
  }

  resizeImages(): void {
    let imagesArray: any = this.images.toArray();

    let maxHeight: number = 0;
    // We skip first image (which we'll be full size)
    for(let i=1; i<imagesArray.length; i++) {
      if(imagesArray[i].nativeElement.height > maxHeight) {
        maxHeight = imagesArray[i].nativeElement.height;
      }
    }

    let relWidths: any = [];
    let totalRelWidth: number = 0;
    for(let i=1; i<imagesArray.length; i++) {
      let relWidth: number = imagesArray[i].nativeElement.width * maxHeight / imagesArray[i].nativeElement.height;
      relWidths[i] = relWidth;
      totalRelWidth += relWidth;
    }
    for(let i=1; i<imagesArray.length; i++) {
      let percentageWidth: number = relWidths[i] / totalRelWidth;
      let newWidth: number = Math.floor((this.eventWidth - this.margin * (imagesArray.length - 2)) * percentageWidth);
      this.renderer.setStyle(imagesArray[i].nativeElement, 'width', `${newWidth}px`);
    }
  }

  openImage(imageI: number): void {
    this.openLightbox.emit({
      eventId: this.event.id,
      imageI: imageI
    });
  }
}
