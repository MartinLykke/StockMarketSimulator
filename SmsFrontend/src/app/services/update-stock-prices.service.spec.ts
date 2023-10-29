import { TestBed } from '@angular/core/testing';

import { UpdateStockPricesService } from './update-stock-prices.service';

describe('UpdateStockPricesService', () => {
  let service: UpdateStockPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateStockPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
