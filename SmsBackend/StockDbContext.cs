using Microsoft.EntityFrameworkCore;

namespace StockMarketBackend
{
    public class StockDbContext : DbContext
    {
        public StockDbContext(DbContextOptions<StockDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the table name for the Stock entity
            modelBuilder.Entity<Stock>().ToTable("Stock", "dbo");

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Stock> Stocks { get; set; }
    }
}
