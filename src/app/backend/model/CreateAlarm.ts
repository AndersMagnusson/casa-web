import * as models from './models';

export interface CreateAlarm {
    id?: string;

    description?: string;

    devices?: string[];

    mobileNumbers?: string[];

    motionDetection?: boolean;

    continous?: boolean;
}
