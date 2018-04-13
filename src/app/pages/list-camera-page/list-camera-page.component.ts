import { Component, OnInit, Inject } from '@angular/core';
import { DevicesApi, Device, Error } from '../../backend';
import { AddCamera, DeviceCredentials, Credentials, ErrorDisplay, RemoveDevice } from '../../models';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CredentialsComponentComponent } from '../../components/common/credentials-component/credentials-component.component';
import { DialogErrorComponentComponent } from '../../components/common/dialog-error-component/dialog-error-component.component';
export interface DeviceUI {
  serialNumber: string;
  model: number;
  address: number;
  username: string;
}

@Component({
  selector: 'app-list-camera-page',
  templateUrl: './list-camera-page.component.html',
  styleUrls: ['./list-camera-page.component.css']
})
export class ListCameraPageComponent implements OnInit {
  public devices: Device[];
  public hasErrors: false;

  constructor(public dialog: MatDialog, public deviceAddedBar: MatSnackBar, private deviceApi: DevicesApi) {
    this.devices = [];
  }

  ngOnInit() {
    this.listDevices();
    this.hasErrors = false;
  }


  public onRemove(device: RemoveDevice) {
    this.deviceApi.deleteDevice(device.serialNumber).subscribe((res) => {
      this.listDevices();
      this.deviceAddedBar.open(`Device ${device.serialNumber} was removed`, `${device.serialNumber}`, {
        duration: 3000,
      });
    }, (err) => {
      console.error(err);
      this.openErrorDialog(new ErrorDisplay('Error', 'Failed to remove device ' + device.serialNumber));
    });
  }

  public edit(device: Device) {

  }

  public onCredentialsSave(deviceCredentials: DeviceCredentials) {
    const addDevice = new AddCamera(
      deviceCredentials.serialNumber,
      new Credentials(deviceCredentials.username, deviceCredentials.password));
    this.deviceApi.addDevice(addDevice).subscribe((res) => {
    }, (err) => {
      console.error('err', err);
      if (err.status === 401) {
        this.openErrorDialog(new ErrorDisplay('Credentials', 'Wrong username and/or password.'));
      } else {
        this.openErrorDialog(new ErrorDisplay('Error', 'An unexpected error occured.'));
      }
    });
  }

  private listDevices() {
    this.deviceApi.listDevices().subscribe((devices) => {
      this.devices = devices;
    }, (err) => console.error('listDevices error: ', err));
  }

  private openErrorDialog(err: ErrorDisplay): void {
    const dialogRef = this.dialog.open(DialogErrorComponentComponent, {
      width: '300px',
      data: err
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
