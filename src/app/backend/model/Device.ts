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

export interface Device {
    serialNumber?: string;

    address?: string;

    username?: string;

    modelName?: string;

    statusMessage?: string;

    isOkStatus?: boolean;

    status?: Status;
}

export interface Status {
    credential?: boolean;
    network?: boolean;
    error?: boolean;
    hasStatus?: boolean;
    lastStatusCheck?: string;

}
