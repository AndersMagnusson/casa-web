import { Component, OnInit, ViewChild, ViewChildren, Input } from '@angular/core';
import { AlarmsApi, Alarm, ToggleAlarm, AlertsApi } from './../../../backend';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import { Event, EventType } from '../timeline-item/event';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Input() events: Event[];
  @ViewChild('eventList') eventList;
  @ViewChildren('li') items;
  constructor(private alarmApi: AlarmsApi, private alertsApi: AlertsApi) {
    this.events = [];
  }

  ngOnInit() {
    // this.alarmApi.getAlarms().subscribe((alarms) => {
    //   alarms.forEach(alarm => {
    //     this.alarmApi.getLogs(alarm.id).map((a) => a.map(
    //       (aa) => new Event(aa.date, alarm.id, EventType.Normal, aa.on ? 'alarm_on' : 'alarm_off'))).merge(this.alertsApi.listAlerts()
    //       .map((alerts) => alerts.map((b) => new Event(b.date, b.shortDescription, EventType.Warning, 'warning'))))
    //       .subscribe((res) => {
    //         console.log('res:', res);
    //         const temp = this.events.concat(res);
    //         this.events = temp.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    //       }, (err) => {
    //         console.error(err);
    //       });
    //   });
    // });
  }
}
