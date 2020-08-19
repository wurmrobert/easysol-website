import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
declare var UIkit: any;

@Component({
  selector: 'app-mac-slideshow',
  templateUrl: './mac-slideshow.component.html',
  styleUrls: ['./mac-slideshow.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('0ms')),
      transition('hidden => shown', animate('500ms')),
    ])
  ]
})
export class MacSlideshowComponent implements OnInit, OnDestroy {

  @Input()
  images: Array<{ src: string, caption: string }>;

  @Input()
  startTimeout = 0;

  images_visible = 'shown';
  images_i = 0;
  screenImgLoaded = false;

  @ViewChild('lightbox')
  lightbox: ElementRef;

  private interval;
  private readonly INTERVAL_TIME = 10000;
  private readonly SHOW_HIDE_TIME = 100;

  constructor() { }

  ngOnInit() {
    if (this.images.length > 1) {
      // setTimeout(() => {
      //   this.startSlideshow();
      // }, this.startTimeout);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }


  startSlideshow() {
    this.interval = setInterval(() => {
      this.images_visible = 'hidden';
      setTimeout(() => {
        if (this.images_i >= this.images.length - 1) {
          this.images_i = 0;
        } else {
          this.images_i++;
        }
        this.images_visible = 'shown';
      }, this.SHOW_HIDE_TIME);
    }, this.INTERVAL_TIME);
  }

  onScreenImgLoaded() {
    this.screenImgLoaded = true;
  }

  onDotClicked(i: number) {
    this.images_i = i;
  }

  openLightbox() {
    // UIkit.lightboxPanel(this.lightbox.nativeElement).show(this.images_i);
    clearInterval(this.interval);
    console.log('lightbox: ', this.lightbox);
  }
}
