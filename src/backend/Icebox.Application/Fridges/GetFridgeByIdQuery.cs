using MediatR;
using Icebox.Application.Foods;
using Icebox.Domain.Fridges;

namespace Icebox.Application.Fridges;

public record GetFridgeByIdQuery(Guid Id) : IRequest<FridgeResponse?>;

public class GetFridgeByIdQueryHandler : IRequestHandler<GetFridgeByIdQuery, FridgeResponse?>
{
  private readonly IFridgeRepository _repository;

  public GetFridgeByIdQueryHandler(IFridgeRepository repository) => _repository = repository;

  public async Task<FridgeResponse?> Handle(GetFridgeByIdQuery request, CancellationToken cancellationToken)
  {
    var fridge = await _repository.GetByIdAsync(request.Id, cancellationToken);
    if (fridge is null) return null;

    return new FridgeResponse(fridge.Id, fridge.Name, fridge.DateCreated, new List<FoodResponse>());
  }
}
