import { NgModule } from '@angular/core';
import { AlarmsApi, AlertsApi, DevicesApi, DiscoveryApi  } from './api/api';
@NgModule({
  providers: [
    AlarmsApi, AlertsApi, DevicesApi, DiscoveryApi
  ],
})

export class BackendModule { }
