using MediatR;
using Icebox.Application.Foods;

namespace Icebox.Application.Fridges;

public record GetAllFridgesQuery : IRequest<List<FridgeDto>>;

public class GetAllFridgesQueryHandler : IRequestHandler<GetAllFridgesQuery, List<FridgeDto>>
{
  private readonly IFridgeRepository _fridgeRepository;
  private readonly IFoodRepository _foodRepository;

  public GetAllFridgesQueryHandler(IFridgeRepository fridgeRepository, IFoodRepository foodRepository)
  {
    _fridgeRepository = fridgeRepository;
    _foodRepository = foodRepository;
  }

  public async Task<List<FridgeDto>> Handle(GetAllFridgesQuery request, CancellationToken cancellationToken)
  {
    var fridges = await _fridgeRepository.GetAllAsync(cancellationToken);
    var foods = await _foodRepository.GetAllAsync(cancellationToken);

    return fridges.Select(f => new FridgeDto(
      f.Id,
      f.Name,
      f.DateCreated,
      foods.Where(food => food.FridgeId == f.Id)
           .Select(food => new FoodDto(food.Id, food.Name, food.ExpirationDate, food.FridgeId))
           .ToList()
    )).ToList();
  }
}
