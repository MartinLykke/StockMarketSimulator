using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using StockMarketBackend;
using HotChocolate.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add configuration to access appsettings.json.
var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

// Configure the DbContext with Azure SQL connection string.
builder.Services.AddDbContext<StockDbContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

// Add GraphQL services.
builder.Services.AddGraphQLServer()
    .AddQueryType<StockQuery>();

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

// Use the GraphQL server middleware.
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapGraphQL(); // Map the GraphQL server endpoint
});

app.Run();
