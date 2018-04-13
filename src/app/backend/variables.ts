import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

// const injector: Injector =
// ReflectiveInjector.resolveAndCreate([{provide: 'basePath', useValue: 'Value'}]);

export const BASE_PATH = environment.basePath; // new InjectionToken<string>('basePath'); // new OpaqueToken('basePath');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};
