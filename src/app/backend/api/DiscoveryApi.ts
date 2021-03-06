/**
 * Magnusson Home Security
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * Contact: mange_magnusson@hotmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { environment } from '../../../environments/environment';
import { Credentials } from '../model/Credentials';


@Injectable()
export class DiscoveryApi {

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

    public newDiscovery(): Observable<any> {
        const path = this.basePath + '/discovery';
        return this.http.post(path, null, { headers: this.defaultHeaders, });
    }

    public listDiscoveredDevices(): Observable<models.DiscoveredDevice[]> {
        const path = this.basePath + '/discovery';
        return this.http.get<models.DiscoveredDevice[]>(path, { headers: this.defaultHeaders, });
    }

    public tryCredentials(serialNumber: string, credentials: Credentials): Observable<any> {
        const path = `${this.basePath}/discovery/devices/${serialNumber}/credentials`;
        return this.http.post(path, credentials, { headers: this.defaultHeaders, });
    }
}
