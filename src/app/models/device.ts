import { Credentials } from './credentials';
import { AddDevice } from '../backend';


export class RemoveDevice {
    constructor(public serialNumber: string) {}
}


export class AddCamera implements AddDevice {
    constructor(public serialNumber: string, public credentials: Credentials) { }
}
