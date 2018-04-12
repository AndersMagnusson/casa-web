import { Component, OnInit, ViewChild } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { AlarmsApi, Alarm, ToggleAlarm } from './../../backend';

@Component({
  selector: 'app-list-alarm',
  templateUrl: './list-alarm.component.html',
  styleUrls: ['./list-alarm.component.css']
})
export class ListAlarmComponent implements OnInit {

  displayedColumns = ['date', 'on'];
  dataSource: AlarmDataSource | null;

  public alarms: Alarm[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private alarmApi: AlarmsApi) { }
  
  ngOnInit() {
    this.dataSource = new AlarmDataSource(this.alarmApi, this.paginator);
    // this.alarmApi.listAlarms(null).subscribe((res) => {
    //   this.alarms = res;
    // }, (err) => console.error(err));
  }
}


export class AlarmDataSource extends DataSource<any> {
  constructor(private alarmApi: AlarmsApi, private paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Alarm[]> {
    return this.alarmApi.listAlarms(null).map((res) => {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return res.splice(startIndex, this.paginator.pageSize);
    }, (err) => console.error(err));

    // return Observable.merge(...displayDataChanges).map(() => {
    //   const data = this._exampleDatabase.data.slice();

    //   // Grab the page's slice of data.
    //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    //   return data.splice(startIndex, this.paginator.pageSize);
    // });
  }

  disconnect() {}
}
