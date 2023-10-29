using Microsoft.EntityFrameworkCore;
using StockMarketBackend.Models; // Include the User entity

namespace StockMarketBackend
{
    public class StockDbContext : DbContext
    {
        public StockDbContext(DbContextOptions<StockDbContext> options) : base(options) { }
        public DbSet<UserStock> UserStocks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the table name for the Stock entity
            modelBuilder.Entity<Stock>().ToTable("Stock", "dbo");

            // Configure the table name for the User entity
            modelBuilder.Entity<User>().ToTable("Users", "dbo");

            modelBuilder.Entity<UserStock>()
                .HasKey(us => us.UserStockID);

            modelBuilder.Entity<UserStock>()
                .HasOne(us => us.User)
                .WithMany(u => u.UserStocks)
                .HasForeignKey(us => us.UserID);

            modelBuilder.Entity<UserStock>()
                .HasOne(us => us.Stock)
                .WithMany()
                .HasForeignKey(us => us.StockID);
                    base.OnModelCreating(modelBuilder);
        }

        public DbSet<Stock> Stocks { get; set; }

        // Add a DbSet for the User entity
        public DbSet<User> Users { get; set; }
    }
}
