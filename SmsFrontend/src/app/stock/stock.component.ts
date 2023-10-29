import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { StockDataService } from '../stock-data.service';
import { UserService } from '../services/userservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  selectedStockSymbol!: string;
  selectedStock: any;
  buyStockMutation: any;
  confirmationMessages: string[] = [];
  shares: number = 1; // Property to bind with shares input
  price: number = 1; // Property to bind with price input
  stockID: number = 1;
    constructor(
      private route: ActivatedRoute,
      private apollo: Apollo,
      private stockDataService: StockDataService,
      private userService: UserService, 

    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        const symbol = params.get('symbol');
        if (symbol !== null) {
          this.selectedStockSymbol = symbol;
          const { userId } = this.userService.getUserData();

          // Fetch stock data using the selected symbol
          const stockData = this.fetchStockData(symbol);
        } else {
          console.error('Symbol route parameter is null.');
        }
      });
    }

    fetchStockData(symbol: string): void {
      const query = gql`
        query {
          stockData {
            symbol
            price
            todays_Change
            date
            stock_Name
            stockID
          }
        }
      `;

      this.apollo
        .query({
          query: query,
        })
        .subscribe((result: any) => {
          // Filter the stock data to get the stock with the correct symbol
          this.selectedStock = result.data.stockData.find(
            (stock: any) => stock.symbol === this.selectedStockSymbol
          );
          this.stockID = this.selectedStock.stockID;
        });
    }
    
  
    handleBuyClick(): void {
      const { userId } = this.userService.getUserData();
    
      // Check if the user's buying price is higher than or equal to the current stock price
      if (this.price >= this.selectedStock.price) {
        const input = {
          userID: userId,
          stockID: this.stockID,
          price: this.price,
          shares: this.shares,
        };
    
        this.buyStockMutation = gql`
          mutation {
            buyStock(input: {
              userID: ${input.userID},
              stockID: ${input.stockID},
              shares: ${input.shares},
              price: ${input.price}
            })
          }
        `;
    
        this.apollo
          .mutate({
            mutation: this.buyStockMutation,
          })
          .subscribe((result: any) => {
            const boughtStock = `${this.shares} shares of ${this.selectedStock.stock_Name} (${this.selectedStockSymbol}) bought at $${this.price} per share`;
            console.log('Stock bought successfully:', boughtStock);
            const confirmationMessage = `Stock bought successfully! ${boughtStock}`;
            this.confirmationMessages.push(confirmationMessage);
          });
      } else {
        // Display an error message to the user
        const errorMessage = `You cannot buy at a price lower than the current stock price. Current stock price: $${this.selectedStock.price}`;
        console.error(errorMessage);
        const errorConfirmationMessage = `Error: ${errorMessage}`;
        this.confirmationMessages.push(errorConfirmationMessage);
      }
    }
    
    
    

  chartOptions = {
		theme: "light2",
		animationEnabled: true,
		zoomEnabled: true,
		title: {
			text: ""
		},
		axisY: {
			labelFormatter: (e: any) => {
				var suffixes = ["", "K", "M", "B", "T"];
 
				var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
				if(order > suffixes.length - 1)
					order = suffixes.length - 1;
 
				var suffix = suffixes[order];
				return "$" + (e.value / Math.pow(1000, order)) + suffix;
			}
		},
		data: [{
			type: "line",
			xValueFormatString: "YYYY",
			yValueFormatString: "$#,###.##",
			dataPoints: [
        { x: new Date(2003, 0, 1), y: 63.49 },
        { x: new Date(2004, 0, 1), y: 74.57 },
        { x: new Date(2005, 0, 1), y: 82.42 },
        { x: new Date(2006, 0, 1), y: 101.78 },
        { x: new Date(2007, 0, 1), y: 106.70 },
        { x: new Date(2008, 0, 1), y: 75.61 },
        { x: new Date(2009, 0, 1), y: 89.53 },
        { x: new Date(2010, 0, 1), y: 103.81 },
        { x: new Date(2011, 0, 1), y: 89.52 },
        { x: new Date(2012, 0, 1), y: 103.42 },
        { x: new Date(2013, 0, 1), y: 121.49 },
        { x: new Date(2014, 0, 1), y: 127.79 },
        { x: new Date(2015, 0, 1), y: 125.63 },
        { x: new Date(2016, 0, 1), y: 132.03 },
        { x: new Date(2017, 0, 1), y: 152.98 },
        { x: new Date(2018, 0, 1), y: 139.64 },
        { x: new Date(2019, 0, 1), y: 143.82 },
        { x: new Date(2020, 0, 1), y: 128.47 },
        { x: new Date(2021, 0, 1), y: 156.29 },
        { x: new Date(2022, 0, 1), y: 168.95 },
        { x: new Date(2023, 0, 1), y: 178.63 }
      ]
      
		}]
	}	
  
}
