import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { AppComponent } from './app.component';
import { AlarmPageComponent } from './pages/alarm-page/alarm-page.component';
import { CustomMaterialModule } from './material/material.module';
import { BackendModule } from './backend/backend-module';
import { ToggleAlarmComponent } from './components/toggle-alarm/toggle-alarm.component';
import { ListAlarmComponent } from './components/list-alarm/list-alarm.component';
import { AppRoutingModule } from './app-routing.module';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { TimelineItemComponent } from './components/common/timeline-item/timeline-item.component';
import { MenuComponent } from './components/common/menu/menu.component';
import { AddCameraPageComponent } from './pages/add-camera-page/add-camera-page.component';
import { EditableDeviceComponentComponent } from './components/common/editable-device-component/editable-device-component.component';
import { CredentialsComponentComponent } from './components/common/credentials-component/credentials-component.component';
import { ViewPortService } from './services/view-port.service';
import { ListCameraPageComponent } from './pages/list-camera-page/list-camera-page.component';
import { DeviceComponentComponent } from './components/common/device-component/device-component.component';
import { CreateAlarmPageComponent } from './pages/create-alarm-page/create-alarm-page.component';
import { TimelineComponent } from './components/common/timeline/timeline.component';
import {
  DialogCredentialsComponentComponent
} from './components/common/dialog-credentials-component/dialog-credentials-component.component';
import { ListDevicesComponentComponent } from './components/common/list-devices-component/list-devices-component.component';
import { DialogErrorComponentComponent } from './components/common/dialog-error-component/dialog-error-component.component';
import { DialogYesNoComponent } from './components/common/dialog-yes-no/dialog-yes-no.component';
import { WizardAlarmPageComponent } from './pages/wizard-alarm-page/wizard-alarm-page.component';
import { ListAlarmPageComponent } from './pages/list-alarm-page/list-alarm-page.component';
import { LiveViewPageComponent } from './pages/live-view-page/live-view-page.component';
import { LiveViewDeviceComponent } from './components/common/live-view-device/live-view-device.component';

@NgModule({
  declarations: [
    AppComponent,
    AlarmPageComponent,
    ToggleAlarmComponent,
    ListAlarmComponent,
    EventsPageComponent,
    TimelineItemComponent,
    MenuComponent,
    AddCameraPageComponent,
    EditableDeviceComponentComponent,
    CredentialsComponentComponent,
    ListCameraPageComponent,
    DeviceComponentComponent,
    CreateAlarmPageComponent,
    TimelineComponent,
    DialogCredentialsComponentComponent,
    ListDevicesComponentComponent,
    DialogErrorComponentComponent,
    DialogYesNoComponent,
    WizardAlarmPageComponent,
    ListAlarmPageComponent,
    LiveViewPageComponent,
    LiveViewDeviceComponent
  ],
  entryComponents: [DialogCredentialsComponentComponent, DialogErrorComponentComponent, DialogYesNoComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    CdkTableModule,
    AppRoutingModule,
    BackendModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    BackendModule,
    ViewPortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
