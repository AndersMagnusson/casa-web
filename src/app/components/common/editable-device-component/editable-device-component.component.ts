import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { DiscoveredDevice } from '../../../backend';

import { ViewPortService } from '../../../services/view-port.service';
import { Credentials, AddCamera } from '../../../models';

@Component({
  selector: 'app-editable-device-component',
  templateUrl: './editable-device-component.component.html',
  styleUrls: ['./editable-device-component.component.css']
})
export class EditableDeviceComponentComponent implements OnInit {

  @Input() device: DiscoveredDevice;
  @Output() onSaved = new EventEmitter<AddCamera>();

  public isInViewPort: boolean;

  constructor(public el: ElementRef, private viewPortService: ViewPortService) { }

  ngOnInit() {
    this.checkElement();
  }

  public checkElement() {
    this.isInViewPort = this.viewPortService.checkInViewPort(this.el);
  }

  public onSavedCredentials(credentials: Credentials) {
    this.onSaved.emit(new AddCamera(this.device.serialNumber, credentials));
  }
}
