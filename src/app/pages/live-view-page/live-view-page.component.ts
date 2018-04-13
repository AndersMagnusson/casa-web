import { Component, OnInit, ViewChild } from '@angular/core';
import { DevicesApi, Device, Error } from '../../backend';

@Component({
  selector: 'app-live-view-page',
  templateUrl: './live-view-page.component.html',
  styleUrls: ['./live-view-page.component.css']
})
export class LiveViewPageComponent implements OnInit {

  public devices: Device[];
  constructor(private deviceApi: DevicesApi) { }

  async ngOnInit() {
    this.deviceApi.listDevices().subscribe((res) => {
      this.devices = res;
    });
  }
}
