using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; // Add this using directive

namespace StockMarketBackend.Models
{
    public class User
    {
        public int UserID { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string Username { get; set; }

        // Add this navigation property to represent UserStocks
        public ICollection<UserStock> UserStocks { get; set; }
    }
}
