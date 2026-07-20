using Icebox.Domain.Fridges;
using Icebox.Domain.Foods;
using Microsoft.EntityFrameworkCore;

namespace Icebox.Infrastructure;

public class IceboxDbContext : DbContext
{
    public IceboxDbContext(DbContextOptions<IceboxDbContext> options) : base(options) { }

    public DbSet<Fridge> Fridges => Set<Fridge>();
    public DbSet<Food> Foods => Set<Food>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Fridge>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.PrimitiveCollection(e => e.FoodIds);
        });

        modelBuilder.Entity<Food>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.ExpirationDate).IsRequired();
            entity.Property(e => e.FridgeId).IsRequired();
        });
    }
}