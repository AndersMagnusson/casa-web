import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatTableDataSource, MatCheckbox } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogCredentialsComponentComponent } from '../dialog-credentials-component/dialog-credentials-component.component';
import { DeviceCredentials, Confirm, RemoveDevice } from '../../../models';
import { DialogYesNoComponent } from '../dialog-yes-no/dialog-yes-no.component';
import { DialogErrorComponentComponent } from '../dialog-error-component/dialog-error-component.component';
import { Device } from '../../../backend';
export interface DeviceUI {
  serialNumber: string;
  model: number;
  address: number;
  username: string;
  statusMessage: string;
}

@Component({
  selector: 'app-list-devices-component',
  templateUrl: './list-devices-component.component.html',
  styleUrls: ['./list-devices-component.component.css']
})
export class ListDevicesComponentComponent implements OnInit {

  @Input() displayedColumns = ['serialNumber', 'model', 'address', 'status', 'edit'];

  @Input()
  set devices(devices: Device[]) {
    console.log('setting devices', devices);
    if (devices && devices.length > 0) {
      // for (const d of devices) {
      //   if (d.status && d.status.hasStatus) {
      //     if (d.status.error) {
      //       d.statusMessage = 'unknown error';
      //     } else if (!d.status.network) {
      //       d.statusMessage = 'no contact';
      //     } else if (!d.status.credential) {
      //       d.statusMessage = 'wrong credentials';
      //     } else {
      //       d.statusMessage = 'ok';
      //       d.isOkStatus = true;
      //     }
      //   } else {
      //     d.statusMessage = 'unknown';
      //   }
      // }
      for (const d of devices) {
        let found = false;
        for (const dd of this.dataSource.data) {
          if (d.serialNumber === (<Device>dd).serialNumber) {
            found = true;
          }
        }
        if (found) {
          this.dataSource.data.push(d);
        }
      }
      this.dataSource.data = devices;
    } else {
      this.dataSource.data = [];
    }
  }
  get name() { return this.dataSource.data; }

  @Output() onRemove = new EventEmitter<RemoveDevice>();
  @Output() onCredentialsSave = new EventEmitter<DeviceCredentials>();
  @Output() onAdd = new EventEmitter<Device>();
  @Output() onSelect = new EventEmitter<Device>();
  @Output() onUnSelect = new EventEmitter<Device>();

  public dataSource = new MatTableDataSource();


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public onAdding(element: Device) {
    if (!element.status) {
      return;
    }
    if (element.status && !element.status.credential) {
      this.openEditDialog(element);
    } else {
      this.onAdd.emit(element);
    }
  }

  public onSelecting(element: Device, checkBox: MatCheckbox) {
    console.log('event: ', checkBox);

    if (!element.status) {
      return;
    }
    if (element.status && !element.status.credential) {
      this.openEditDialog(element);
    } else {
      if (checkBox.checked) {
        console.log('element: ', element);
        this.onSelect.emit(element);
      } else {
        this.onUnSelect.emit(element);
      }
    }
  }

  public openEditDialog(device: Device): void {
    const dialogRef = this.dialog.open(DialogCredentialsComponentComponent, {
      width: '300px',
      data: device
    });

    dialogRef.afterClosed().subscribe((result: DeviceCredentials) => {
      if (result) {
        console.log('Emitting credentials', result);
        this.onCredentialsSave.emit(result);
        console.log('Edmitted credentials', result);
      }
    });
  }

  public openRemoveDialog(device: DeviceUI): void {
    const dialogRef = this.dialog.open(DialogYesNoComponent, {
      width: '300px',
      data: new Confirm('Remove', 'Do you want to remove device ' + device.serialNumber)
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        console.log('Emitting delete', result);
        this.onRemove.emit(new RemoveDevice(device.serialNumber));
        console.log('Edmitted delete', result);
      }
    });
  }
}
