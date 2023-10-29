using System.Threading.Tasks;
using HotChocolate;
using StockMarketBackend;
using StockMarketBackend.Models;

public class StockMutation
{
        private readonly ILogger<StockMutation> _logger;

    public StockMutation(ILogger<StockMutation> logger)
    {
        _logger = logger;
    }
public async Task<User> CreateUserAsync(
    [Service] StockDbContext context,
    UserInput input)
{
    try
    {
        // Check if the username already exists
        if (context.Users.Any(u => u.Username == input.Username))
        {
            _logger.LogWarning("Username '{0}' is already taken.", input.Username);
            throw new GraphQLException("Username is already taken.");
        }

        var newUser = new User
        {
            Username = input.Username
        };

        context.Users.Add(newUser);
        await context.SaveChangesAsync();

        _logger.LogInformation("User '{0}' created successfully.", input.Username);

        return newUser; // Return the newly created user object
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error creating user '{0}'", input.Username);
        throw; // Rethrow the exception
    }
}


public async Task<bool> BuyStockAsync(
    [Service] StockDbContext context,
    BuyStockInput input)
{
    try
    {
        // Check if the user and stock exist
        var user = await context.Users.FindAsync(input.UserID);
        var stock = await context.Stocks.FindAsync(input.StockID);

        if (user == null || stock == null)
        {
            return false; // User or stock not found
        }

        // Create a new UserStock entry with the price
        var userStock = new UserStock
        {
            UserID = input.UserID,
            StockID = input.StockID,
            Price = input.Price // Set the price here
        };

        context.UserStocks.Add(userStock);
        await context.SaveChangesAsync();

        return true; // Stock bought successfully
    }
    catch (Exception)
    {
        return false; // An error occurred
    }
}
}
