import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Alarm } from './../../../backend';
import { Event } from './event';
import { ViewPortService } from '../../../services/view-port.service';
@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.css']
})
export class TimelineItemComponent implements OnInit {
  @Input() event: Event;

  public isInViewPort: boolean;
  public isWarningEvent: boolean;
  private now: Date;
  constructor(public el: ElementRef, private viewPortService: ViewPortService) {
    this.now = new Date();
  }

  ngOnInit() {
    this.checkElement();
  }

  public checkElement() {
    this.isInViewPort = this.viewPortService.checkInViewPort(this.el);
    // const rect = this.el.nativeElement.getBoundingClientRect();
    // this.isInViewPort = (
    //   rect.top >= 0 &&
    //   rect.left >= 0 &&
    //   rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //   rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    // );
    // console.log('isInViewPort:', this.isInViewPort);
  }


  public getDate(dateString: Date) {
    const date = new Date(dateString);
    if (date.getFullYear() === this.now.getFullYear() && date.getMonth() === this.now.getMonth()) {
      if (date.getDay() === this.now.getDay()) {
        const minutes = date.getMinutes();
        if (minutes < 10) {
          return `${date.getHours()}:0${minutes}`;
        }
        return `${date.getHours()}:${minutes}`;
      }
    }

    return date.toLocaleString();
  }
}
