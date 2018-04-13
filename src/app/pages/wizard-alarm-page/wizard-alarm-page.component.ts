import { Component, OnInit, group } from '@angular/core';

import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DevicesApi, AlarmsApi, Device, Alarm } from '../../backend';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wizard-alarm-page',
  templateUrl: './wizard-alarm-page.component.html',
  styleUrls: ['./wizard-alarm-page.component.css']
})
export class WizardAlarmPageComponent implements OnInit {

  public submitted: boolean;
  public events: any[] = [];
  public devices: Device[];
  public alarms: Alarm[];
  public smsNumbers: string[];
  public sendSms: boolean;
  public alarmFormGroup: FormGroup;
  public recordingsFormGroup: FormGroup;
  public smsFormGroup: FormGroup;
  public camerasFormGroup: FormGroup;
  public selectedDevices: FormControl;

  private editNumber: string;
  private alarmId: string;

  constructor(private fb: FormBuilder, private deviceApi: DevicesApi, private alarmsApi: AlarmsApi, private route: ActivatedRoute) {
    this.devices = [];
    this.smsNumbers = [];
    this.sendSms = false;
  }

  ngOnInit() {
    this.selectedDevices = new FormControl();
    this.selectedDevices.setValue([]);
    console.log('params:', this.route.snapshot.paramMap.keys);
    const alarmId = this.route.snapshot.paramMap.get('alarmId');
    if (alarmId) {
      this.alarmId = alarmId;
      this.alarmsApi.getAlarm(this.alarmId).subscribe((a) => this.edit(a), (err) => console.error(err));
    }

    this.alarmFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', []],
    });

    this.camerasFormGroup = this.fb.group({});
    this.recordingsFormGroup = this.fb.group({
      motionDetection: [false, []],
      continous: [false, []],
    });

    this.smsFormGroup = this.fb.group({
      sendSms: ['', []],
      mobileNumber: ['', []],
      smsUsername: ['', []],
      smsPassword: ['', []],
      smsFromNumber: ['', []],
      smsInterval: ['', []],
    });
    this.smsFormGroup.get('sendSms').setValue(false);

    this.listDevices();
    this.listAlarms();
  }

  public onAdd(element: Device) {
    console.log('onAdd', element);
  }

  public save(theForm) {
    if (this.alarmFormGroup.valid && this.recordingsFormGroup.valid && this.smsFormGroup.valid) {
      const createAlarm = {
        id: this.alarmFormGroup.get('name').value,
        description: this.alarmFormGroup.get('description').value,
        motionDetection: this.recordingsFormGroup.get('motionDetection').value,
        continous: this.recordingsFormGroup.get('continous').value,
        devices: this.selectedDevices.value,
        sms: {
          sendSms: this.smsFormGroup.get('sendSms').value,
          username: this.smsFormGroup.get('smsUsername').value,
          password: this.smsFormGroup.get('smsPassword').value,
          fromNumber: this.smsFormGroup.get('smsFromNumber').value,
          interval: this.smsFormGroup.get('smsInterval').value,
          mobileNumbers: this.smsNumbers,
        }
      };

      this.alarmsApi.createAlarm(createAlarm).subscribe((res) => {
        console.log('created');
        this.alarmFormGroup.reset();
        this.recordingsFormGroup.reset();
        this.smsFormGroup.reset();
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
    this.alarmFormGroup.get('name').setValue(alarm.id);
    this.alarmFormGroup.get('description').setValue(alarm.description);
    this.recordingsFormGroup.get('motionDetection').setValue(alarm.motionDetection);
    this.recordingsFormGroup.get('continous').setValue(alarm.continous);

    if (alarm.sms) {
      if (alarm.sms.mobileNumbers) {
        this.smsNumbers = alarm.sms.mobileNumbers;
        this.smsFormGroup.get('mobileNumber').setValue('');
        this.smsFormGroup.get('sendSms').setValue(true);
        this.smsFormGroup.get('smsUsername').setValue(alarm.sms.username);
        this.smsFormGroup.get('smsPassword').setValue(alarm.sms.password);
        this.smsFormGroup.get('smsFromNumber').setValue(alarm.sms.fromNumber);
        this.smsFormGroup.get('smsInterval').setValue(alarm.sms.interval);
        this.selectedDevices.setValue(alarm.devices.filter(s => s !== ''));
        this.sendSms = true;
      } else {
        this.smsFormGroup.get('sendSms').setValue(false);
        this.sendSms = false;
      }
    }
  }

  public onSelectDevice(device: Device) {
    console.log('theDevice', device);
    this.selectedDevices.value.push(device.serialNumber);
    console.log('selectedDevices: ', this.selectedDevices.value);
  }

  public onUnSelectDevice(device: Device) {
    const temp = this.selectedDevices.value as Array<Device>;
    this.selectedDevices.setValue(temp.filter((s) => s !== device.serialNumber));
  }

  public saveSmsNumber() {
    if (this.editNumber) {
      const existingIndex = this.smsNumbers.findIndex((n) => n === this.editNumber);
      if (existingIndex >= 0) {
        this.smsNumbers[existingIndex] = this.smsFormGroup.get('mobileNumber').value;
      }
      this.editNumber = null;
    } else {
      this.smsNumbers.push(this.smsFormGroup.get('mobileNumber').value);
    }

    this.smsFormGroup.get('mobileNumber').reset();
    this.smsFormGroup.get('mobileNumber').markAsUntouched();
  }
  public deleteSmsNumber(number: string) {
    this.smsNumbers = this.smsNumbers.filter((n) => n !== number);
  }
  public editSmsNumber(number: string) {
    this.editNumber = number;
    this.smsFormGroup.get('mobileNumber').setValue(number);
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
