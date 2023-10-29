import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  constructor(private apollo: Apollo) {
    this.startSimulateStockPriceChanges();

  }

  getStockData(): Observable<any> {
    return this.apollo.query({
      query: gql`
      query {
        stockData {
          symbol
          price
          todays_Change
          date
          stockID
          stock_Name
        }
      }
      `,
    });
  }

  getUserStocks(userId: number): Observable<any> {
    return this.apollo.query({
      query: gql`
      query GetUserStocks($userId: Int!) {
        userStocks(userId: $userId) {
          userStockID
          userID
          stockID
          price
        }
      }
      `,
      variables: {
        userId: userId,
      },
    });
  }

  // Add a method to simulate stock price changes every 10 seconds
  private startSimulateStockPriceChanges() {
    console.log("Updating stock prices");

    setInterval(() => {
      this.apollo.mutate({
        mutation: gql`
          mutation {
            simulateStockPriceChanges
          }
        `,
      }).subscribe();
    }, 10000); // 10 seconds in milliseconds
  }
}
