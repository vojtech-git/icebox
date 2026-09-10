using MediatR;
using Icebox.Domain.Foods;
using Icebox.Domain.Fridges;

namespace Icebox.Application.Foods;

public record DeleteFoodCommand(Guid Id) : IRequest<bool>;

public class DeleteFoodCommandHandler : IRequestHandler<DeleteFoodCommand, bool>
{
  private readonly IFoodRepository _foodRepository;

  public DeleteFoodCommandHandler(IFoodRepository foodRepository)
  {
    _foodRepository = foodRepository;
  }

  public async Task<bool> Handle(DeleteFoodCommand request, CancellationToken cancellationToken)
  {
    var food = await _foodRepository.GetByIdAsync(request.Id, cancellationToken);
    if (food is null) return false;

    await _foodRepository.DeleteAsync(food, cancellationToken);
    await _foodRepository.SaveChangesAsync(cancellationToken);
    return true;
  }
}
