using MediatR;
using Icebox.Application.Foods;
using Icebox.Domain.Fridges;
using Icebox.Domain.Foods;

namespace Icebox.Application.Fridges;

public record UpdateFridgeCommand(Guid Id, string Name) : IRequest<FridgeResponse?>;

public class UpdateFridgeCommandHandler : IRequestHandler<UpdateFridgeCommand, FridgeResponse?>
{
  private readonly IFridgeRepository _fridgeRepository;
  private readonly IFoodRepository _foodRepository;

  public UpdateFridgeCommandHandler(IFridgeRepository fridgeRepository, IFoodRepository foodRepository)
  {
    _fridgeRepository = fridgeRepository;
    _foodRepository = foodRepository;
  }

  public async Task<FridgeResponse?> Handle(UpdateFridgeCommand request, CancellationToken cancellationToken)
  {
    var fridge = await _fridgeRepository.GetByIdAsync(request.Id, cancellationToken);
    if (fridge is null) return null;

    fridge.UpdateName(request.Name);
    await _fridgeRepository.SaveChangesAsync(cancellationToken);

    var allFoods = await _foodRepository.GetAllAsync(cancellationToken);
    var fridgeFoods = allFoods
        .Where(f => f.FridgeId == fridge.Id)
        .Select(f => new FoodResponse(f.Id, f.Name, f.ExpirationDate, f.FridgeId))
        .ToList();

    return new FridgeResponse(fridge.Id, fridge.Name, fridge.DateCreated, fridgeFoods);
  }
}
