using Icebox.Domain.Foods;
using MediatR;

namespace Icebox.Application.Foods;

public record GetFoodByIdQuery(Guid Id) : IRequest<FoodResponse?>;

public class GetFoodByIdQueryHandler : IRequestHandler<GetFoodByIdQuery, FoodResponse?>
{
  private readonly IFoodRepository _repository;

  public GetFoodByIdQueryHandler(IFoodRepository repository) => _repository = repository;

  public async Task<FoodResponse?> Handle(GetFoodByIdQuery request, CancellationToken cancellationToken)
  {
    var food = await _repository.GetByIdAsync(request.Id, cancellationToken);
    if (food is null) return null;

    return new FoodResponse(food.Id, food.Name, food.ExpirationDate, food.FridgeId);
  }
}
