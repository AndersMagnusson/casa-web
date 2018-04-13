import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiscoveryApi, DiscoveredDevice, DevicesApi, AddDevice, Device } from '../../backend';
import { AddCamera, DeviceCredentials, Credentials, ErrorDisplay } from '../../models';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogErrorComponentComponent } from '../../components/common/dialog-error-component/dialog-error-component.component';

@Component({
  selector: 'app-add-camera-page',
  templateUrl: './add-camera-page.component.html',
  styleUrls: ['./add-camera-page.component.css']
})
export class AddCameraPageComponent implements OnInit, OnDestroy {

  public devices: DiscoveredDevice[];
  public temp: DiscoveredDevice[];
  public existingDevices: Device[];
  private intervalId: number;
  constructor(
    public dialog: MatDialog, public deviceAddedBar: MatSnackBar, private discoveryApi: DiscoveryApi, private deviceApi: DevicesApi) {
    this.devices = [];
    this.temp = [];
  }

  ngOnInit() {
    this.deviceApi.listDevices().subscribe((devices) => {
      this.existingDevices = devices;
      this.intervalId = setInterval(() => {
        this.discoveryApi.listDiscoveredDevices().subscribe((discoveredDevices) => {
          let found = false;
          for (const dd of discoveredDevices) {
            for (const d of this.devices) {
              if (dd.serialNumber === d.serialNumber) {
                found = true;
              }
            }
            if (!found) {
              if (!this.isExistingDevice(dd.serialNumber)) {
                this.temp.push(dd);
                this.devices = this.temp;
              }
            }
          }
        }, (err) => console.error(' ', err));
      }, 1000);
    }, (err) => console.error('existingDevices error: ', err));


    this.discoveryApi.newDiscovery().subscribe((res) => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }, (err) => console.error('newDiscovery: ', err));


  }

  public onCredentialsSave(deviceCredentials: DeviceCredentials) {
    const addDevice = new AddCamera(
      deviceCredentials.serialNumber,
      new Credentials(deviceCredentials.username, deviceCredentials.password));
    this.deviceApi.addDevice(addDevice).subscribe((res) => {
      const addedDevice = this.devices.find((d) => d.serialNumber === deviceCredentials.serialNumber);
      if (addedDevice) {
        this.existingDevices.push(addDevice);
      }
      this.devices = this.devices.filter((d) => d.serialNumber !== deviceCredentials.serialNumber);
      this.deviceAddedBar.open(`Device ${deviceCredentials.serialNumber} was added`, 'hubba', {
        duration: 500,
      });
    }, (err) => {
      console.error('err', err);
      if (err.status === 401) {
        this.openErrorDialog(new ErrorDisplay('Credentials', 'Wrong username and/or password.'));
      } else {
        this.openErrorDialog(new ErrorDisplay('Error', 'An unexpected error occured.'));
      }
    });
  }

  public onSaved(addCamera: AddCamera) {
    this.deviceApi.addDevice(addCamera).subscribe((res) => {
      this.deviceAddedBar.open(`Device ${addCamera.serialNumber} was added`, `${addCamera.serialNumber}`, {
        duration: 3000,
      });
    }, (err) => {
      console.error(err);
    });
  }

  private isExistingDevice(serialNumber: string): boolean {
    for (const d of this.existingDevices) {
      if (d.serialNumber === serialNumber) {
        return true;
      }
    }
    return false;
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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
