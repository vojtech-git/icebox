using Icebox.Domain.Fridges;

namespace Icebox.Application.Fridges;

public interface IFridgeRepository
{
    Task AddAsync(Fridge fridge, CancellationToken cancellationToken);
    Task<List<Fridge>> GetAllAsync(CancellationToken cancellationToken);
    Task<Fridge?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task DeleteAsync(Fridge fridge, CancellationToken cancellationToken);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}