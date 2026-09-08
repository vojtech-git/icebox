using MediatR;
using Icebox.Domain.Fridges;
using Icebox.Application.Foods;

namespace Icebox.Application.Fridges;

public record CreateFridgeCommand(string Name) : IRequest<FridgeResponse>;

public class CreateFridgeCommandHandler : IRequestHandler<CreateFridgeCommand, FridgeResponse>
{
  private readonly IFridgeRepository _repository;

  public CreateFridgeCommandHandler(IFridgeRepository repository)
  {
    _repository = repository;
  }

  public async Task<FridgeResponse> Handle(CreateFridgeCommand request, CancellationToken cancellationToken)
  {
    var fridge = new Fridge(request.Name);

    await _repository.AddAsync(fridge, cancellationToken);
    await _repository.SaveChangesAsync(cancellationToken);

    return new FridgeResponse(fridge.Id, fridge.Name, fridge.DateCreated, new List<FoodResponse>());
  }
}
