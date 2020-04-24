import { Component, OnInit, Input, ViewChildren, Renderer2, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
  @Input() event: any;
  @ViewChildren('image') images: QueryList<ElementRef>;

  loadedImageCount: number = 0;
  eventWidth: number;

  margin: number = 5;

  constructor(private renderer: Renderer2, private el:ElementRef) { }

  ngOnInit(): void {
    this.eventWidth = this.el.nativeElement.offsetWidth;
  }

  onLoad($event: any): void {
    this.loadedImageCount++;
    if(this.loadedImageCount == this.event.images.length) {
      this.resizeImages();
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
}
