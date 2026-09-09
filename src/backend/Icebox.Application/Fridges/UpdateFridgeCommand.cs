using MediatR;
using Icebox.Application.Foods;
using Icebox.Domain.Fridges;

namespace Icebox.Application.Fridges;

public record UpdateFridgeCommand(Guid Id, string Name) : IRequest<FridgeResponse?>;

public class UpdateFridgeCommandHandler : IRequestHandler<UpdateFridgeCommand, FridgeResponse?>
{
  private readonly IFridgeRepository _fridgeRepository;

  public UpdateFridgeCommandHandler(IFridgeRepository fridgeRepository)
  {
    _fridgeRepository = fridgeRepository;
  }

  public async Task<FridgeResponse?> Handle(UpdateFridgeCommand request, CancellationToken cancellationToken)
  {
    var fridge = await _fridgeRepository.GetByIdAsync(request.Id, cancellationToken);
    if (fridge is null) return null;

    fridge.UpdateName(request.Name);
    await _fridgeRepository.SaveChangesAsync(cancellationToken);

    var foodResponses = fridge.Foods
        .Select(f => new FoodResponse(f.Id, f.Name, f.ExpirationDate, f.FridgeId))
        .ToList();

    return new FridgeResponse(fridge.Id, fridge.Name, fridge.DateCreated, foodResponses);
  }
}
