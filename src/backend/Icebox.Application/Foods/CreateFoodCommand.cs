using MediatR;
using Icebox.Domain.Foods;
using Icebox.Domain.Fridges;

namespace Icebox.Application.Foods;

public record CreateFoodCommand(string Name, DateTime ExpirationDate, Guid FridgeId) : IRequest<FoodResponse?>;

public class CreateFoodCommandHandler : IRequestHandler<CreateFoodCommand, FoodResponse?>
{
  private readonly IFoodRepository _foodRepository;
  private readonly IFridgeRepository _fridgeRepository;

  public CreateFoodCommandHandler(IFoodRepository foodRepository, IFridgeRepository fridgeRepository)
  {
    _foodRepository = foodRepository;
    _fridgeRepository = fridgeRepository;
  }

  public async Task<FoodResponse?> Handle(CreateFoodCommand request, CancellationToken cancellationToken)
  {
    var fridge = await _fridgeRepository.GetByIdAsync(request.FridgeId, cancellationToken);
    if (fridge is null) return null;

    var utcExpirationDate = DateTime.SpecifyKind(request.ExpirationDate, DateTimeKind.Utc);

    var food = new Food(request.Name, utcExpirationDate, request.FridgeId);

    await _foodRepository.AddAsync(food, cancellationToken);

    fridge.FoodIds.Add(food.Id);
    await _foodRepository.SaveChangesAsync(cancellationToken);

    return new FoodResponse(food.Id, food.Name, food.ExpirationDate, food.FridgeId);
  }
}
