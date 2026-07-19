using MediatR;

namespace Icebox.Application.Fridges;

public record GetFridgeByIdQuery(Guid Id) : IRequest<FridgeDto?>;

public class GetFridgeByIdQueryHandler : IRequestHandler<GetFridgeByIdQuery, FridgeDto?>
{
    private readonly IFridgeRepository _repository;

    public GetFridgeByIdQueryHandler(IFridgeRepository repository) => _repository = repository;

    public async Task<FridgeDto?> Handle(GetFridgeByIdQuery request, CancellationToken cancellationToken)
    {
        var fridge = await _repository.GetByIdAsync(request.Id, cancellationToken);
        if (fridge is null) return null;

        return new FridgeDto(fridge.Id, fridge.Name, fridge.DateCreated, fridge.FoodIds);
    }
}