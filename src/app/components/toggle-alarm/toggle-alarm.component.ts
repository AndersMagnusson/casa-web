import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSlider, MatCard, MatCardContent } from '@angular/material';
import { AlarmsApi, Alarm, ToggleAlarm, AlertsApi } from './../../backend';
import { Event, EventType } from '../../components/common/timeline-item/event';
// import { SetToggleAlarm } from '../../models';

@Component({
  selector: 'app-toggle-alarm',
  templateUrl: './toggle-alarm.component.html',
  styleUrls: ['./toggle-alarm.component.css'],
  providers: [AlarmsApi, HttpClient]
})
export class ToggleAlarmComponent implements OnInit {

  @Output() onToggled = new EventEmitter<ToggleAlarm>();

  public color = 'accent';
  // public checked = false;
  // public disabled = false;
  public alarms: Alarm[];
  private now: Date;

  constructor(private alarmsApi: AlarmsApi, private alertsApi: AlertsApi) {
  }

  ngOnInit() {
    this.now = new Date();
    this.alarmsApi.getAlarms().subscribe((alarms) => {
      this.alarms = alarms;
    }, (err) => {
      console.error(err);
    });
  }

  public toggle(alarm) {
    console.log('toggle', alarm);
    const toggleAlarm: ToggleAlarm = { on: !alarm.on };
    this.alarmsApi.toggleAlarm(alarm.id, toggleAlarm).subscribe((res) => {
      console.log('finished');
      alarm.on = toggleAlarm.on;
      this.onToggled.emit(res);
    }, (err) => console.error(err));
  }

  // public getLogs(alarm: Alarm) {
  //   alarm.logs = [];
  //   this.alarmsApi.getLogs(alarm.id)
  //     .map((alarms) => alarms.map((a) => new Event(a.date, a.id, EventType.Normal, a.on ? 'alarm_on' : 'alarm_off')))
  //     .merge(this.alertsApi.listAlertsForAlarm(alarm.id)
  //       .map((alerts) => alerts.map((b) => new Event(b.date, b.shortDescription, EventType.Warning, 'warning'))))
  //     .subscribe((res) => {
  //       console.log('res:', res);
  //       const temp = alarm.logs.concat(res);
  //       alarm.logs = temp.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  //     }, (err) => {
  //       console.error(err);
  //     });
  // }

  // public getDate(dateString: Date) {
  //   const date = new Date(dateString);
  //   if (date.getFullYear() === this.now.getFullYear() && date.getMonth() === this.now.getMonth()) {
  //     if (date.getDay() === this.now.getDay()) {
  //       return `${date.getHours()}:${date.getMinutes()}`;
  //     }
  //   }

  //   return date.toLocaleString();
  // }
}
