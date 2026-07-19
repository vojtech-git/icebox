using Icebox.Application.Fridges;
using Icebox.Domain.Fridges;
using Microsoft.EntityFrameworkCore;

namespace Icebox.Infrastructure.Fridges;

public class FridgeRepository : IFridgeRepository
{
    private readonly IceboxDbContext _context;

    public FridgeRepository(IceboxDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Fridge fridge, CancellationToken cancellationToken)
    {
        await _context.Fridges.AddAsync(fridge, cancellationToken);
    }

    public async Task<List<Fridge>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _context.Fridges.AsNoTracking().ToListAsync(cancellationToken);
    }

    public async Task<Fridge?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Fridges.FirstOrDefaultAsync(f => f.Id == id, cancellationToken);
    }

    public Task DeleteAsync(Fridge fridge, CancellationToken cancellationToken)
    {
        _context.Fridges.Remove(fridge);
        return Task.CompletedTask;
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken)
    {
        await _context.SaveChangesAsync(cancellationToken);
    }
}