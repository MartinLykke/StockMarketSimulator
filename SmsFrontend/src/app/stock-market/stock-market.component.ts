import { Component } from '@angular/core';

@Component({
  selector: 'app-stock-market',
  templateUrl: './stock-market.component.html',
  styleUrls: ['./stock-market.component.scss']
})
export class StockMarketComponent {
  stocks = [
    { name: 'AAPL', price: 150.25 },
    { name: 'GOOGL', price: 2800.45 },
    { name: 'MSFT', price: 300.12 },
    { name: 'AMZN', price: 3500.67 },
    // Add more stocks here
  ];

  constructor() {}
}
