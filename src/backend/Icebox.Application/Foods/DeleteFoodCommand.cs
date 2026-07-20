using MediatR;
using Icebox.Application.Fridges;

namespace Icebox.Application.Foods;

public record DeleteFoodCommand(Guid Id) : IRequest<bool>;

public class DeleteFoodCommandHandler : IRequestHandler<DeleteFoodCommand, bool>
{
    private readonly IFoodRepository _foodRepository;
    private readonly IFridgeRepository _fridgeRepository;

    public DeleteFoodCommandHandler(IFoodRepository foodRepository, IFridgeRepository fridgeRepository)
    {
        _foodRepository = foodRepository;
        _fridgeRepository = fridgeRepository;
    }

    public async Task<bool> Handle(DeleteFoodCommand request, CancellationToken cancellationToken)
    {
        var food = await _foodRepository.GetByIdAsync(request.Id, cancellationToken);
        if (food is null) return false;

        var fridge = await _fridgeRepository.GetByIdAsync(food.FridgeId, cancellationToken);
        if (fridge is not null)
        {
            fridge.FoodIds.Remove(food.Id);
        }

        await _foodRepository.DeleteAsync(food, cancellationToken);
        await _foodRepository.SaveChangesAsync(cancellationToken);
        return true;
    }
}