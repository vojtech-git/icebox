public record CreateFridgeCommand(string Name) : IRequest<FridgeDto>;

public class CreateFridgeCommandHandler : IRequestHandler<CreateFridgeCommand, FridgeDto>
{
    private readonly IFridgeRepository _repository;

    public CreateFridgeCommandHandler(IFridgeRepository repository)
    {
        _repository = repository;
    }

    public async Task<FridgeDto> Handle(CreateFridgeCommand request, CancellationToken cancellationToken)
    {
        var fridge = new Fridge(request.Name);
        
        await _repository.AddAsync(fridge, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        return new FridgeDto(fridge.Id, fridge.Name, fridge.DateCreated, fridge.FoodIds);
    }
}