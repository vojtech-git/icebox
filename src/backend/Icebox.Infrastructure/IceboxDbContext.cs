using Icebox.Domain.Fridges;
using Microsoft.EntityFrameworkCore;

namespace Icebox.Infrastructure;

public class IceboxDbContext : DbContext
{
    public IceboxDbContext(DbContextOptions<IceboxDbContext> options) : base(options) { }

    public DbSet<Fridge> Fridges => Set<Fridge>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Fridge>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.PrimitiveCollection(e => e.FoodIds);
        });
    }
}