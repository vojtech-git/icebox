using MediatR;

namespace Icebox.Application.Fridges;

public record GetAllFridgesQuery : IRequest<List<FridgeResponse>>;

public class GetAllFridgesQueryHandler : IRequestHandler<GetAllFridgesQuery, List<FridgeResponse>>
{
  private readonly IFridgeReadService _readService;

  public GetAllFridgesQueryHandler(IFridgeReadService readService)
  {
    _readService = readService;
  }

  public async Task<List<FridgeResponse>> Handle(GetAllFridgesQuery request, CancellationToken cancellationToken)
  {
    return await _readService.GetAllFridgesWithFoodsAsync(cancellationToken);
  }
}
