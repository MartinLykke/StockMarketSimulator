# How to run
Press F5 in program.cs

goto a graphql test area e.g. localhost:5157/graphql

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
