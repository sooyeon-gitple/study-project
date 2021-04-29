import { TestBed } from '@angular/core/testing';

import { GlobalState } from './global-state.service';

describe('GlobalStateService', () => {
  let service: GlobalState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
