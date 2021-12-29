import { TestBed } from '@angular/core/testing';

import { AbocostumerService } from './abocostumer.service';

describe('AbocostumerService', () => {
  let service: AbocostumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbocostumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
