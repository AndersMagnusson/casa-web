import { TestBed, inject } from '@angular/core/testing';

import { ViewPortService } from './view-port.service';

describe('ViewPortService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewPortService]
    });
  });

  it('should be created', inject([ViewPortService], (service: ViewPortService) => {
    expect(service).toBeTruthy();
  }));
});
