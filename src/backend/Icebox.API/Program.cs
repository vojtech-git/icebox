using Microsoft.EntityFrameworkCore;
using Icebox.Application.Fridges;
using Scalar.AspNetCore;
using Icebox.Infrastructure;
using Icebox.Infrastructure.Fridges;
using Icebox.Application.Foods;
using Icebox.Infrastructure.Foods;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(IFridgeRepository).Assembly));

builder.Services.AddDbContext<IceboxDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IFridgeRepository, FridgeRepository>();
builder.Services.AddScoped<IFoodRepository, FoodRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.MapControllers();
app.Run();