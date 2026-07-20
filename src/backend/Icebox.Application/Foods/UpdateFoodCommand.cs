using MediatR;

namespace Icebox.Application.Foods.Commands.UpdateFood;

public record UpdateFoodCommand(Guid Id, string Name, DateTime ExpirationDate) : IRequest<FoodDto?>;

public class UpdateFoodCommandHandler : IRequestHandler<UpdateFoodCommand, FoodDto?>
{
    private readonly IFoodRepository _repository;

    public UpdateFoodCommandHandler(IFoodRepository repository) => _repository = repository;

    public async Task<FoodDto?> Handle(UpdateFoodCommand request, CancellationToken cancellationToken)
    {
        var food = await _repository.GetByIdAsync(request.Id, cancellationToken);
        if (food is null) return null;

        food.UpdateDetails(request.Name, request.ExpirationDate);
        await _repository.SaveChangesAsync(cancellationToken);

        return new FoodDto(food.Id, food.Name, food.ExpirationDate, food.FridgeId);
    }
}