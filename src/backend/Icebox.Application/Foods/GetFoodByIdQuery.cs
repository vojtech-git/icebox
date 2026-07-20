using MediatR;

namespace Icebox.Application.Foods;

public record GetFoodByIdQuery(Guid Id) : IRequest<FoodDto?>;

public class GetFoodByIdQueryHandler : IRequestHandler<GetFoodByIdQuery, FoodDto?>
{
    private readonly IFoodRepository _repository;

    public GetFoodByIdQueryHandler(IFoodRepository repository) => _repository = repository;

    public async Task<FoodDto?> Handle(GetFoodByIdQuery request, CancellationToken cancellationToken)
    {
        var food = await _repository.GetByIdAsync(request.Id, cancellationToken);
        if (food is null) return null;

        return new FoodDto(food.Id, food.Name, food.ExpirationDate, food.FridgeId);
    }
}