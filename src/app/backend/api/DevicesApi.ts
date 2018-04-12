import { Inject, Injectable, Optional, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { environment } from '../../../environments/environment';


@Injectable()
export class DevicesApi {

    protected basePath = 'http://tobedecided/v1';
    public defaultHeaders: HttpHeaders = new HttpHeaders();
    public configuration: Configuration = new Configuration();

    constructor(protected http: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        } else {
            this.basePath = BASE_PATH;
        }
        if (configuration) {
            this.configuration = configuration;
        }
        this.defaultHeaders.set('Content-Type', 'application/json');
    }

    public addDevice(device: models.AddDevice): Observable<any> {
        const path = this.basePath + '/devices';
        return this.http.post(path, device, { headers: this.defaultHeaders, });
    }

    public listDevices(): Observable<models.Device[]> {
        const path = this.basePath + '/devices';
        return this.http.get<models.Device[]>(path, { headers: this.defaultHeaders, });
    }

    public deleteDevice(serialNumber: string): Observable<any> {
        const path = this.basePath + '/devices/' + serialNumber;
        return this.http.delete(path, { headers: this.defaultHeaders, });
    }
}
