using Icebox.Domain.Foods;
using MediatR;

namespace Icebox.Application.Foods;

public record UpdateFoodCommand(Guid Id, string Name, DateTime ExpirationDate) : IRequest<FoodResponse?>;

public class UpdateFoodCommandHandler : IRequestHandler<UpdateFoodCommand, FoodResponse?>
{
  private readonly IFoodRepository _repository;

  public UpdateFoodCommandHandler(IFoodRepository repository) => _repository = repository;

  public async Task<FoodResponse?> Handle(UpdateFoodCommand request, CancellationToken cancellationToken)
  {
    var food = await _repository.GetByIdAsync(request.Id, cancellationToken);
    if (food is null) return null;

    food.UpdateDetails(request.Name, request.ExpirationDate);
    await _repository.SaveChangesAsync(cancellationToken);

    return new FoodResponse(food.Id, food.Name, food.ExpirationDate, food.FridgeId);
  }
}
