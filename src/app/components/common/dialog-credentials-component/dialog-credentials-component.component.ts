import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Device, DiscoveryApi } from '../../../backend';
import { DeviceCredentials, Credentials } from '../../../models/credentials';

@Component({
  selector: 'app-dialog-credentials-component',
  templateUrl: './dialog-credentials-component.component.html',
  styleUrls: ['./dialog-credentials-component.component.css']
})
export class DialogCredentialsComponentComponent implements OnInit {
  @Input() username: string;

  public usernameFormControl = new FormControl('', [Validators.required]);
  public passwordFormControl = new FormControl('', [Validators.required]);
  public showError: boolean;
  public errorMessage: string;
  constructor(
    public dialogRef: MatDialogRef<DialogCredentialsComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public device: Device,
    private discoveryApi: DiscoveryApi) { }

  ngOnInit() {
    this.username = this.device.username;
    this.usernameFormControl.setValue(this.username);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    this.discoveryApi.tryCredentials(
      this.device.serialNumber, new Credentials(this.usernameFormControl.value, this.passwordFormControl.value)).subscribe(() => {
        this.dialogRef.close(new DeviceCredentials(
           this.device.serialNumber, this.usernameFormControl.value, this.passwordFormControl.value));
      }, (err) => {
        if (err.status === 401) {
          this.showError = true;
          this.errorMessage = 'Wrong username and/or password';
        } else {
          this.showError = true;
          this.errorMessage = 'An error occured.';
        }
      });
  }

}


