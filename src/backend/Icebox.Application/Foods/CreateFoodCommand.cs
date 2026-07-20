using MediatR;
using Icebox.Application.Fridges;
using Icebox.Domain.Foods;

namespace Icebox.Application.Foods;

public record CreateFoodCommand(string Name, DateTime ExpirationDate, Guid FridgeId) : IRequest<FoodDto?>;

public class CreateFoodCommandHandler : IRequestHandler<CreateFoodCommand, FoodDto?>
{
    private readonly IFoodRepository _foodRepository;
    private readonly IFridgeRepository _fridgeRepository;

    public CreateFoodCommandHandler(IFoodRepository foodRepository, IFridgeRepository fridgeRepository)
    {
        _foodRepository = foodRepository;
        _fridgeRepository = fridgeRepository;
    }

    public async Task<FoodDto?> Handle(CreateFoodCommand request, CancellationToken cancellationToken)
    {
        var fridge = await _fridgeRepository.GetByIdAsync(request.FridgeId, cancellationToken);
        if (fridge is null) return null;

        var food = new Food(request.Name, request.ExpirationDate, request.FridgeId);
        
        await _foodRepository.AddAsync(food, cancellationToken);
        
        fridge.FoodIds.Add(food.Id);
        await _foodRepository.SaveChangesAsync(cancellationToken);

        return new FoodDto(food.Id, food.Name, food.ExpirationDate, food.FridgeId);
    }
}