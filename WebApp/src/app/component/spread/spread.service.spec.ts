import { TestBed } from '@angular/core/testing';

import { SpreadService } from './spread.service';

describe('SpreadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpreadService = TestBed.get(SpreadService);
    expect(service).toBeTruthy();
  });
});
