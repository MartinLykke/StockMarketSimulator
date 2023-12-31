import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketComponent } from './stock-market.component';

describe('StockMarketComponent', () => {
  let component: StockMarketComponent;
  let fixture: ComponentFixture<StockMarketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockMarketComponent]
    });
    fixture = TestBed.createComponent(StockMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
