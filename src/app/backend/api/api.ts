export * from './AlarmsApi';
import { AlarmsApi } from './AlarmsApi';
export * from './AlertsApi';
import { AlertsApi } from './AlertsApi';
export * from './DevicesApi';
import { DevicesApi } from './DevicesApi';
export * from './DiscoveryApi';
import { DiscoveryApi } from './DiscoveryApi';
export const APIS = [AlarmsApi, AlertsApi, DevicesApi, DiscoveryApi];
