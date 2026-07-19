using Microsoft.EntityFrameworkCore;
using Icebox.Application.Fridges;
using Scalar.AspNetCore;
using Icebox.Infrastructure;
using Icebox.Infrastructure.Fridges;

var builder = WebApplication.CreateBuilder(args);

// Add MediatR (scans Application assembly)
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(IFridgeRepository).Assembly));

// Add EF Core (PostgreSQL or SQL Server)
builder.Services.AddDbContext<IceboxDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register Repositories
builder.Services.AddScoped<IFridgeRepository, FridgeRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Built-in .NET OpenAPI generator
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.MapControllers();
app.Run();