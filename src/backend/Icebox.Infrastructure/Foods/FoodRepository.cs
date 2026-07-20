using Microsoft.EntityFrameworkCore;
using Icebox.Application.Foods;
using Icebox.Domain.Foods;

namespace Icebox.Infrastructure.Foods;

public class FoodRepository : IFoodRepository
{
    private readonly IceboxDbContext _context;

    public FoodRepository(IceboxDbContext context) => _context = context;

    public async Task AddAsync(Food food, CancellationToken cancellationToken)
    {
        await _context.Foods.AddAsync(food, cancellationToken);
    }

    public async Task<Food?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Foods.FirstOrDefaultAsync(f => f.Id == id, cancellationToken);
    }

    public Task DeleteAsync(Food food, CancellationToken cancellationToken)
    {
        _context.Foods.Remove(food);
        return Task.CompletedTask;
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken)
    {
        await _context.SaveChangesAsync(cancellationToken);
    }
}