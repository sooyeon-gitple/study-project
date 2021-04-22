import { TestBed } from '@angular/core/testing';

import { Top5Service } from './top5.service';

describe('Top5Service', () => {
  let service: Top5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Top5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
