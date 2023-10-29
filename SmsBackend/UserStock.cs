using StockMarketBackend;
using StockMarketBackend.Models;

public class UserStock
{
    public int UserStockID { get; set; }
    public int UserID { get; set; }
    public int StockID { get; set; }
    public decimal Price { get; set; } // Add the "price" property

    public User User { get; set; }
    public Stock Stock { get; set; }
}
