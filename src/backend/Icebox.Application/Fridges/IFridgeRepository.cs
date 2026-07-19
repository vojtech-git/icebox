public interface IFridgeRepository
{
    Task AddAsync(Fridge fridge, CancellationToken cancellationToken);
    Task<List<Fridge>> GetAllAsync(CancellationToken cancellationToken);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}