using MediatR;
using Icebox.Application.Foods;

namespace Icebox.Application.Fridges;

public record UpdateFridgeCommand(Guid Id, string Name) : IRequest<FridgeDto?>;

public class UpdateFridgeCommandHandler : IRequestHandler<UpdateFridgeCommand, FridgeDto?>
{
  private readonly IFridgeRepository _fridgeRepository;
  private readonly IFoodRepository _foodRepository;

  public UpdateFridgeCommandHandler(IFridgeRepository fridgeRepository, IFoodRepository foodRepository)
  {
    _fridgeRepository = fridgeRepository;
    _foodRepository = foodRepository;
  }

  public async Task<FridgeDto?> Handle(UpdateFridgeCommand request, CancellationToken cancellationToken)
  {
    var fridge = await _fridgeRepository.GetByIdAsync(request.Id, cancellationToken);
    if (fridge is null) return null;

    fridge.UpdateName(request.Name);
    await _fridgeRepository.SaveChangesAsync(cancellationToken);

    var allFoods = await _foodRepository.GetAllAsync(cancellationToken);
    var fridgeFoods = allFoods
        .Where(f => f.FridgeId == fridge.Id)
        .Select(f => new FoodDto(f.Id, f.Name, f.ExpirationDate, f.FridgeId))
        .ToList();

    return new FridgeDto(fridge.Id, fridge.Name, fridge.DateCreated, fridgeFoods);
  }
}
