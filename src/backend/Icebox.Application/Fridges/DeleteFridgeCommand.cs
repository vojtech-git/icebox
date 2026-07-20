using MediatR;

namespace Icebox.Application.Fridges;

public record DeleteFridgeCommand(Guid Id) : IRequest<bool>;

public class DeleteFridgeCommandHandler : IRequestHandler<DeleteFridgeCommand, bool>
{
    private readonly IFridgeRepository _repository;

    public DeleteFridgeCommandHandler(IFridgeRepository repository) => _repository = repository;

    public async Task<bool> Handle(DeleteFridgeCommand request, CancellationToken cancellationToken)
    {
        var fridge = await _repository.GetByIdAsync(request.Id, cancellationToken);
        if (fridge is null) return false;

        await _repository.DeleteAsync(fridge, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);
        return true;
    }
}