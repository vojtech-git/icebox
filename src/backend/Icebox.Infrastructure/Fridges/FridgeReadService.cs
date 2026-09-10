using Icebox.Application.Fridges;
using Icebox.Application.Foods;
using Microsoft.EntityFrameworkCore;

namespace Icebox.Infrastructure.Fridges;

public class FridgeReadService : IFridgeReadService
{
  private readonly IceboxDbContext _context;

  public FridgeReadService(IceboxDbContext context) => _context = context;

  public async Task<List<FridgeResponse>> GetAllFridgesWithFoodsAsync(CancellationToken cancellationToken)
  {
    return await _context.Fridges.AsNoTracking()
        .Select(fridge => new FridgeResponse(
            fridge.Id,
            fridge.Name,
            fridge.DateCreated,
            _context.Foods
                .Where(food => food.FridgeId == fridge.Id)
                .Select(food => new FoodResponse(food.Id, food.Name, food.ExpirationDate, food.FridgeId))
                .ToList()
        ))
        .ToListAsync(cancellationToken);
  }
}
