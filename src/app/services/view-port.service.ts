import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ViewPortService {

  constructor() { }

  public checkInViewPort(el: ElementRef) {
    const rect = el.nativeElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
