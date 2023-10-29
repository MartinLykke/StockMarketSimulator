# How to run
In folder StockMarketSimulator\SmsBackend run ``` docker build -t smsbackend . ```

Then ```docker run -d -p 8080:80 smsbackend ```

goto a graphql test area e.g.  http://localhost:8080/graphql/
Send the query:  

```
query {
  stockData {
    symbol
    price
    volume
    date
  }
}
```

Output should be similar to:

```
{
  "data": {
    "stockData": [
      {
        "symbol": "novo",
        "price": 614.2,
        "volume": 10000,
        "date": "2023-09-17T14:19:27.430+02:00"
      }
    ]
  }
}
```
Buy stock:
```
mutation {
  buyStock(input: { userID: 3, stockID: 1, price: 611 }) {
}
}
```

Create user

```
mutation {
  createUser(input: { username: "test1" }) {
    username
  }
}
```

Get stocks purchased by a user

```

query {
  userStocks(userId: 1) {
    userStockID
    userID
    stockID
    price

  }
}

```

# Known issues
If the frontend is not loading any stocks, check app.module.ts if the link is correct. You can find a new one in azure container app. Alternatively, press F5 in program.cs and run the API locally.