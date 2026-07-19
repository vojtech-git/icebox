
using MediatR;

namespace Icebox.Application.Fridges;

public record UpdateFridgeCommand(Guid Id, string Name) : IRequest<FridgeDto?>;

public class UpdateFridgeCommandHandler : IRequestHandler<UpdateFridgeCommand, FridgeDto?>
{
    private readonly IFridgeRepository _repository;

    public UpdateFridgeCommandHandler(IFridgeRepository repository) => _repository = repository;

    public async Task<FridgeDto?> Handle(UpdateFridgeCommand request, CancellationToken cancellationToken)
    {
        var fridge = await _repository.GetByIdAsync(request.Id, cancellationToken);
        if (fridge is null) return null;

        fridge.UpdateName(request.Name);
        await _repository.SaveChangesAsync(cancellationToken);

        return new FridgeDto(fridge.Id, fridge.Name, fridge.DateCreated, fridge.FoodIds);
    }
}