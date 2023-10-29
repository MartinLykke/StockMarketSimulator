using Microsoft.AspNetCore.Mvc;
using StockMarketBackend;

namespace StockMarketBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StockMarketController : ControllerBase
    {
        private readonly StockQuery _stockQuery;

        public StockMarketController(StockQuery stockQuery)
        {
            _stockQuery = stockQuery;
        }

        [HttpGet(Name = "GetStockMarketData")]
        public async Task<IEnumerable<Stock>> GetAsync()
        {
            return await _stockQuery.GetStockDataAsync();
        }
    }
}
