import { TestBed } from '@angular/core/testing';

import { DatenService } from './daten.service';

describe('DatenService', () => {
  let service: DatenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
