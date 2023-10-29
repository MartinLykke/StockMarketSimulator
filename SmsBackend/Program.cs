using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using HotChocolate.AspNetCore;
using StockMarketBackend;
using HotChocolate;
using HotChocolate.AspNetCore;
using StockMarketBackend;
using Microsoft.Extensions.Logging;
using StockMarketBackend.GraphQL.Types; // Import the namespace of UserType




var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add configuration to access appsettings.json.
var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

builder.Logging.AddConfiguration(configuration.GetSection("Logging"));

builder.Logging.AddConsole(); // Add console logging
builder.Logging.AddDebug();   // Add debug logging
// Configure the DbContext with Azure SQL connection string.
builder.Services.AddDbContext<StockDbContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
           .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()))
);

builder.Services.AddGraphQLServer()
    .AddQueryType<StockQuery>()
    .AddMutationType<MutationType>()
    .AddType<UserType>()
    .AddType<UserInputType>()
    .AddType<BuyStockInputType>()
    .AddType<BuyStockInputType>();



builder.Services.AddScoped<StockQuery>();

// Register the StockMutation class as a service
builder.Services.AddScoped<StockMutation>();

// Configure CORS policies
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:4200") // Allow requests from your Angular app's origin
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Enable the GraphQL Playground in development mode.
    app.UsePlayground();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

// Use the CORS middleware
app.UseCors();

// Use the GraphQL server middleware.
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapGraphQL(); // Map the GraphQL server endpoint
});

app.Run();
