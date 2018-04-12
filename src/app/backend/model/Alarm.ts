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

import * as models from './models';

export interface Alarm {
    id?: string;

    description?: string;

    on?: boolean;

    date?: Date;

    logs?: Alarm[];

    devices?: string[];

    motionDetection?: boolean;

    continous?: boolean;

    sms?: Sms;
}

export interface Sms {
    username?: string;
    password?: string;
    fromNumber?: string;
    interval?: number;
    mobileNumbers?: string[];
}