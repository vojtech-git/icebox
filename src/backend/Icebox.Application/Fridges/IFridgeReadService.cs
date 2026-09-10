namespace Icebox.Application.Fridges;

public interface IFridgeReadService
{
  Task<List<FridgeResponse>> GetAllFridgesWithFoodsAsync(CancellationToken cancellationToken);
}
