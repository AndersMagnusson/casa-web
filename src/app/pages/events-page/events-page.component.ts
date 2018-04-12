import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AlarmsApi, Alarm, ToggleAlarm, AlertsApi } from './../../backend';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import { Event, EventType } from '../../components/common/timeline-item/event';
@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {

  public events: Event[];
  @ViewChild('eventList') eventList;
  @ViewChildren('li') items;
  constructor(private alarmApi: AlarmsApi, private alertsApi: AlertsApi) {
    this.events = [];
  }

  ngOnInit() {
    console.log('ngOnInit');

    this.alarmApi.getAlarms()
      .map((alarms) => alarms.map((a) => new Event(a.date, a.id, EventType.Normal, a.on ? 'alarm_on' : 'alarm_off')))
      .merge(this.alertsApi.listAlerts()
        .map((alerts) => alerts.map((b) => new Event(b.date, b.shortDescription, EventType.Warning, 'warning'))))
      .subscribe((res) => {
        console.log('res:', res);
        const temp = this.events.concat(res);
        this.events = temp.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }, (err) => {
        console.error(err);
      });

    // this.alarmApi.listAlarms(null).subscribe((res) => {
    //   console.log('events: ', res);
    //   this.events = res;
    //   // this.items.changes.subscribe((r) => {
    //   //   // this.callbackFunc();
    //   // });
    //   //this.callbackFunc();
    // }, (err) => console.error(err));
  }

  // var items = document.querySelectorAll(".timeline li");
  // isElementInViewport(el) {
  //   const rect = el.getBoundingClientRect();
  //   console.log('rect', rect);
  //   return (
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );
  // }

  // callbackFunc() {
  //   // const items = this.eventList.nativeElement.getElementsByTagName('li')[0];
  //   // const items = this.eventList.nativeElement.querySelectorAll('.timeline li');
  //   console.log('nativeElement', this.eventList.nativeElement);
  //   // console.log('items lengt: ', items.length);
  //   const items = this.items;
  //   console.log('items: ', items);

  //   if (items) {
  //     for (let i = 0; i < items.length; i++) {
  //       if (this.isElementInViewport(items[i])) {
  //         console.log('add');
  //         items[i].classList.add('in-view');
  //       }
  //     }
  //   }
  // }
}

