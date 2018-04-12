export enum EventType {
    Normal = 'NORMAL',
    Warning = 'WARNING',
    Error = 'ERROR'
}

export class Event {
    constructor(public date: Date, public header: string, public eventType: EventType, public icon: string) { }
}
