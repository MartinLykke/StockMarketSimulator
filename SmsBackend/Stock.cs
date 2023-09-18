using System;
using System.ComponentModel.DataAnnotations;

namespace StockMarketBackend
{
    public class Stock
    {
        [Key] // Add this attribute to specify the primary key
        public int StockID { get; set; }
        public string Symbol { get; set; }
        public decimal Price { get; set; }
        public int Volume { get; set; }
        public DateTime Date { get; set; }
    }
}
