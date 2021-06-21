import { TestBed } from '@angular/core/testing';

import { NgxSerialService } from './ngx-serial.service';

describe('NgxSerialService', () => {
  let service: NgxSerialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSerialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
