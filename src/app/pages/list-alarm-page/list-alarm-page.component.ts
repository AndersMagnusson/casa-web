import { Component, OnInit } from '@angular/core';
import { AlarmsApi, Alarm } from '../../backend';

@Component({
  selector: 'app-list-alarm-page',
  templateUrl: './list-alarm-page.component.html',
  styleUrls: ['./list-alarm-page.component.css']
})
export class ListAlarmPageComponent implements OnInit {

  public alarms: Alarm[];

  constructor(private alarmsApi: AlarmsApi) { }

  ngOnInit() {
    console.log('list alarm');
    this.listAlarms();
  }

  private listAlarms() {
    this.alarmsApi.getAlarms().subscribe((alarms) => this.alarms = alarms, (err) => console.error(err));
  }
}
