import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DevicesApi, AlarmsApi, Device, Alarm } from '../../backend';

@Component({
  selector: 'app-create-alarm-page',
  templateUrl: './create-alarm-page.component.html',
  styleUrls: ['./create-alarm-page.component.css']
})
export class CreateAlarmPageComponent implements OnInit {

  public createAlarmForm: FormGroup;
  public selectedDevices: FormControl;
  public submitted: boolean;
  public events: any[] = [];
  public devices: Device[];
  public alarms: Alarm[];

  constructor(private fb: FormBuilder, private deviceApi: DevicesApi, private alarmsApi: AlarmsApi) {
    this.devices = [];
  }

  ngOnInit() {

    this.selectedDevices = new FormControl();

    this.createAlarmForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', []],
      motionDetection: [false, []],
      continous: [false, []],
      mobileNumbers: ['', []],
      smsUsername: ['', []],
      smsPassword: ['', []],
      smsFromNumber: ['', []],
      smsInterval: ['', []],
    });
    this.listDevices();
    this.listAlarms();
  }

  public save(theForm) {
    if (this.createAlarmForm.valid) {
      const createAlarm = {
        id: this.createAlarmForm.get('name').value,
        description: this.createAlarmForm.get('description').value,
        motionDetection: this.createAlarmForm.get('motionDetection').value,
        continous: this.createAlarmForm.get('continous').value,
        devices: this.selectedDevices.value,
        sms: {
          username: this.createAlarmForm.get('smsUsername').value,
          password: this.createAlarmForm.get('smsPassword').value,
          fromNumber: this.createAlarmForm.get('smsFromNumber').value,
          interval: this.createAlarmForm.get('smsInterval').value,
          mobileNumbers: this.createAlarmForm.get('mobileNumbers').value.split(','),
        }
      };

      this.alarmsApi.createAlarm(createAlarm).subscribe((res) => {
        console.log('created');
        this.createAlarmForm.reset();
        this.selectedDevices.reset();
        this.listAlarms();
      }, (err) => {
        console.error('failed: ', err);
      });
    } else {
      console.error('form is invalid');
    }
  }
  public delete(alarm: Alarm) {
    this.alarmsApi.deleteAlarm(alarm.id).subscribe(() => {
      this.listAlarms();
    });
  }
  public edit(alarm: Alarm) {
    this.createAlarmForm.get('name').setValue(alarm.id);
    this.createAlarmForm.get('description').setValue(alarm.description);
    this.createAlarmForm.get('motionDetection').setValue(alarm.motionDetection);
    this.createAlarmForm.get('continous').setValue(alarm.continous);
    if (alarm.sms) {
      if (alarm.sms.mobileNumbers) {
        this.createAlarmForm.get('mobileNumbers').setValue(alarm.sms.mobileNumbers.join(','));
      }
      this.createAlarmForm.get('smsUsername').setValue(alarm.sms.username);
      this.createAlarmForm.get('smsPassword').setValue(alarm.sms.password);
      this.createAlarmForm.get('smsFromNumber').setValue(alarm.sms.fromNumber);
      this.createAlarmForm.get('smsInterval').setValue(alarm.sms.interval);
      this.selectedDevices.setValue(alarm.devices);
    }
  }

  private listDevices() {
    this.deviceApi.listDevices().subscribe((devices) => {
      this.devices = devices;
    }, (err) => console.error('listDevices error: ', err));
  }
  private listAlarms() {
    this.alarmsApi.getAlarms().subscribe((alarms) => this.alarms = alarms, (err) => console.error(err));
  }
}
