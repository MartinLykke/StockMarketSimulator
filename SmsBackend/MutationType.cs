using StockMarketBackend;
using StockMarketBackend.Models;

public class MutationType
{
    public async Task<User> CreateUser(
        UserInput input,
        [Service] StockMutation stockMutation,
        [Service] StockDbContext context)
    {
        return await stockMutation.CreateUserAsync(context, input);
    }

    public async Task<bool> BuyStock(
        BuyStockInput input,
        [Service] StockMutation stockMutation,
        [Service] StockDbContext context)
    {
        return await stockMutation.BuyStockAsync(context, input);
    }

    public async Task<bool> SimulateStockPriceChanges([Service] StockQuery stockQuery)
{
    return await stockQuery.SimulateStockPriceChangesAsync();
}

}
