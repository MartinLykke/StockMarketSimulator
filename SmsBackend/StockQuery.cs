using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace StockMarketBackend
{
    public class StockQuery
    {
        private readonly StockDbContext _dbContext;

        public StockQuery(StockDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Stock> GetStockData()
        {
            return _dbContext.Stocks.ToList();
        }
    }
}
