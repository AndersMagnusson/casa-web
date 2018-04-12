import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { Device } from '../../../backend';

import { ViewPortService } from '../../../services/view-port.service';

@Component({
  selector: 'app-device-component',
  templateUrl: './device-component.component.html',
  styleUrls: ['./device-component.component.css']
})
export class DeviceComponentComponent implements OnInit {

  @Input() device: Device;
  @Output() onDelete = new EventEmitter<Device>();

  public isInViewPort: boolean;

  constructor(public el: ElementRef, private viewPortService: ViewPortService) { }

  ngOnInit() {
    this.checkElement();
  }

  public checkElement() {
    this.isInViewPort = this.viewPortService.checkInViewPort(this.el);
  }

  public delete()  {
    this.onDelete.emit(this.device);
  }
}
