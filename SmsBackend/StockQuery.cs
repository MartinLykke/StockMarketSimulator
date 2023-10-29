using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using HotChocolate;
using StockMarketBackend.Models;

namespace StockMarketBackend
{
    public class StockQuery
    {
        private readonly StockDbContext _dbContext;
            private readonly ILogger<StockQuery> _logger;


    public StockQuery(StockDbContext dbContext, ILogger<StockQuery> logger)
        {
            _dbContext = dbContext;
                    _logger = logger;

        }

        public async Task<IEnumerable<Stock>> GetStockDataAsync()
        {
            return await _dbContext.Stocks.ToListAsync();
        }

  public async Task<IEnumerable<UserStock>> GetUserStocksAsync(int userId)
    {
        _logger.LogInformation("Entering GetUserStocksAsync");

        try
        {
            _logger.LogInformation("Query executed successfully");

            return await _dbContext.UserStocks.Where(us => us.UserID == userId).ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in GetUserStocksAsync");
            throw;
        }
        finally
        {
            _logger.LogInformation("Exiting GetUserStocksAsync");
        }
    }

public async Task<bool> SimulateStockPriceChangesAsync()
{
    var random = new Random();
    var stocks = await _dbContext.Stocks.ToListAsync();

    foreach (var stock in stocks)
    {
        // Simulate a percentage change in price (you can adjust this logic as needed)
        double priceChangePercentage = (random.NextDouble() - 0.5) / 10.0; // Random change between -5% and 5%
        stock.Price *= (decimal)(1.0 + priceChangePercentage);

        // Update the stock's date to reflect the new price change
        stock.Date = DateTime.Now;

        _dbContext.Entry(stock).State = EntityState.Modified;
    }

    await _dbContext.SaveChangesAsync();
    return true; // Indicate success
}


    }
}
