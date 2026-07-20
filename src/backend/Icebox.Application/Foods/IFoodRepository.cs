using Icebox.Domain.Foods;

namespace Icebox.Application.Foods;

public interface IFoodRepository
{
    Task AddAsync(Food food, CancellationToken cancellationToken);
    Task<Food?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task DeleteAsync(Food food, CancellationToken cancellationToken);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}