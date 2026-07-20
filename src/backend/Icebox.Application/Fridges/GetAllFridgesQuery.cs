using MediatR;

namespace Icebox.Application.Fridges;

public record GetAllFridgesQuery : IRequest<List<FridgeDto>>;

public class GetAllFridgesQueryHandler : IRequestHandler<GetAllFridgesQuery, List<FridgeDto>>
{
    private readonly IFridgeRepository _repository;

    public GetAllFridgesQueryHandler(IFridgeRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<FridgeDto>> Handle(GetAllFridgesQuery request, CancellationToken cancellationToken)
    {
        var fridges = await _repository.GetAllAsync(cancellationToken);
        
        return fridges.Select(f => new FridgeDto(f.Id, f.Name, f.DateCreated, f.FoodIds)).ToList();
    }
}