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
        public IEnumerable<Stock> Get()
        {
            return _stockQuery.GetStockData();
        }
    }
}
