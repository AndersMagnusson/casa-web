import { Component, OnInit } from '@angular/core';

import { AlarmsApi, Alarm, ToggleAlarm, AlertsApi } from './../../backend';
import { Event, EventType } from '../../components/common/timeline-item/event';

@Component({
  selector: 'app-alarm-page',
  templateUrl: './alarm-page.component.html',
  styleUrls: ['./alarm-page.component.css']
})
export class AlarmPageComponent implements OnInit {

  private now: Date;
  public events: Array<Event>;
  constructor(private alarmsApi: AlarmsApi, private alertsApi: AlertsApi) { }

  ngOnInit() {
    this.now = new Date();
    this.getAllLogs();
  }

  public getLogs(alarm: Alarm) {
    alarm.logs = [];
    this.alarmsApi.getLogs(alarm.id)
      .map((alarms) => alarms.map((a) => new Event(a.date, a.id, EventType.Normal, a.on ? 'alarm_on' : 'alarm_off')))
      .merge(this.alertsApi.listAlertsForAlarm(alarm.id)
        .map((alerts) => alerts.map((b) => new Event(b.date, b.shortDescription, EventType.Warning, 'warning'))))
      .subscribe((res) => {
        console.log('res:', res);
        const temp = this.events.concat(res); // alarm.logs.concat(res);
        this.events = temp.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        console.log(this.events);
      }, (err) => {
        console.error(err);
      });
  }

  // public getDate(dateString: Date) {
  //   const date = new Date(dateString);
  //   if (date.getFullYear() === this.now.getFullYear() && date.getMonth() === this.now.getMonth()) {
  //     if (date.getDay() === this.now.getDay()) {
  //       return `${date.getHours()}:${date.getMinutes()}`;
  //     }
  //   }

  //   return date.toLocaleString();
  // }

  public onToggled(toggling: ToggleAlarm) {
    const e = new Event(toggling.date, toggling.alarmId, EventType.Normal, toggling.on ? 'alarm_on' : 'alarm_off');
    this.events.unshift(e);
  }

  private getAllLogs() {
    this.events = [];
    this.alarmsApi.getAlarms().subscribe((alarms) => {
      alarms.forEach(alarm => {
        this.getLogs(alarm);
      });
    });
  }
}
