import { TestBed } from '@angular/core/testing';

import { EditAmountFacade } from './edit-amount.facade';

describe('EditAmountFacade', () => {
  let service: EditAmountFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditAmountFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
