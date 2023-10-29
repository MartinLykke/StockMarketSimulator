import { Component, OnInit } from '@angular/core';
import { StockDataService } from '../stock-data.service';
import { Router } from '@angular/router';
import { UserService } from '../services/userservice';

@Component({
  selector: 'app-stock-market',
  templateUrl: './stock-market.component.html',
  styleUrls: ['./stock-market.component.scss'],
})
export class StockMarketComponent implements OnInit {
  stocks: any[] = [];
  selectedStock: any;
  userStocks: any[] = [];
  isPositiveChange: boolean = false;
  isNegativeChange: boolean = false;

  constructor(
    private stockDataService: StockDataService,
    private router: Router,
    private userService: UserService // Inject the UserService
  ) {}

  ngOnInit(): void {
    // Get the user's ID from UserService
    const userId = this.userService.getUserData().userId;

    // Fetch user-owned stocks
    this.stockDataService.getUserStocks(userId).subscribe((result) => {
      this.userStocks = result.data.userStocks;
      console.log("User Stocks:", this.userStocks); // Print userStocks to the console

      // Preprocess user stocks to merge duplicates and calculate average price
      this.userStocks = this.preprocessUserStocks(this.userStocks);

      // Iterate through userStocks to add stockName
      this.userStocks.forEach((userStock: any) => {
        const matchingStock = this.stocks.find((stock) => stock.stockID === userStock.stockID);
        if (matchingStock) {
          userStock.stockName = matchingStock.stock_Name;
        }
      });
    });

    // Fetch all available stocks
    this.stockDataService.getStockData().subscribe((result) => {
      this.stocks = result.data.stockData;
      console.log(" Stocks:", this.stocks); // Print userStocks to the console
    });
  }

  preprocessUserStocks(userStocks: any[]): any[] {
    const stockMap = new Map();

    userStocks.forEach((userStock) => {
      const stockID = userStock.stockID;
      if (stockMap.has(stockID)) {
        // If stock already exists, update the total price and quantity
        const existingStock = stockMap.get(stockID);
        existingStock.priceTotal += userStock.price;
        existingStock.quantity += 1;
      } else {
        // If stock doesn't exist, add it to the map
        stockMap.set(stockID, { ...userStock, priceTotal: userStock.price, quantity: 1 });
      }
    });

    // Convert the map back to an array
    return Array.from(stockMap.values()).map((mergedStock) => ({
      ...mergedStock,
      price: (mergedStock.priceTotal / mergedStock.quantity).toFixed(2),
    }));
  }

  sellStock(userStock: any) {
    // Implement the logic to sell the stock and update the user's holdings here.
    // You may need to send an API request to your backend for this.
    // After selling, remove the sold stock from userStocks.
  }

  navigateToStock(stock: any) {
    this.selectedStock = stock;
    this.router.navigate(['/stock', stock.symbol]);
  }

  calculateProfitLossPercentage(userStock: any): string {
    const currentPrice = this.stocks.find(stock => stock.stockID === userStock.stockID)?.price;
    if (currentPrice && userStock.price) {
      const percentage = ((currentPrice - userStock.price) / userStock.price) * 100;
      return percentage >= 0 ? `+${percentage.toFixed(2)}%` : `${percentage.toFixed(2)}%`;
    }
    return 'N/A';
  }

  calculateCurrentValue(userStock: any): string {
    const currentPrice = this.stocks.find((stock) => stock.stockID === userStock.stockID)?.price;
    if (currentPrice) {
      const value = (currentPrice * userStock.quantity).toFixed(2);
      return `${value}`;
    }
    return 'N/A';
  }
  
  calculateTotalPortfolioValue(): string {
    let totalValue = 0;
    this.userStocks.forEach((userStock) => {
      const currentPrice = this.stocks.find((stock) => stock.stockID === userStock.stockID)?.price;
      if (currentPrice) {
        totalValue += currentPrice * userStock.quantity;
      }
    });
    return totalValue.toFixed(2);
  }
calculatePortfolioPercentageChange(): string {
  const totalPortfolioValue = parseFloat(this.calculateTotalPortfolioValue());
  const initialPortfolioValue = this.userStocks.reduce((total, userStock) => {
    const initialPrice = userStock.price;
    return total + initialPrice * userStock.quantity;
  }, 0);

  if (initialPortfolioValue === 0) {
    return 'N/A';
  }

  const percentageChange = ((totalPortfolioValue - initialPortfolioValue) / initialPortfolioValue) * 100;

  if (percentageChange >= 0) {
    this.isPositiveChange = true;
    this.isNegativeChange = false;
    return `+${percentageChange.toFixed(2)}%`;
  } else {
    this.isPositiveChange = false;
    this.isNegativeChange = true;
    return `${percentageChange.toFixed(2)}%`;
  }
}
  
}
