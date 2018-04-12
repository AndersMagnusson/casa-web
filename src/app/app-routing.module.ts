import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { AlarmPageComponent } from './pages/alarm-page/alarm-page.component';
import { AddCameraPageComponent } from './pages/add-camera-page/add-camera-page.component';
import { ListCameraPageComponent } from './pages/list-camera-page/list-camera-page.component';
import { CreateAlarmPageComponent } from './pages/create-alarm-page/create-alarm-page.component';
import { ListAlarmPageComponent } from './pages/list-alarm-page/list-alarm-page.component';
import { WizardAlarmPageComponent } from './pages/wizard-alarm-page/wizard-alarm-page.component';

const routes: Routes = [
  { path: '', component: AlarmPageComponent },
  { path: 'discovery', component: AddCameraPageComponent },
  { path: 'events', component: EventsPageComponent },
  { path: 'cameras', component: ListCameraPageComponent },
  { path: 'alarms', component: ListAlarmPageComponent },
  { path: 'createAlarm', component: CreateAlarmPageComponent },
  { path: 'wizardAlarm/:alarmId', component: WizardAlarmPageComponent },
  { path: 'wizardAlarm', component: WizardAlarmPageComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
