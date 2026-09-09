using Microsoft.AspNetCore.Mvc;
using MediatR;
using Icebox.Application.Foods;

namespace Icebox.API.Foods;

[ApiController]
[Route("api/foods")]
public class FoodController : ControllerBase
{
  private readonly IMediator _mediator;
  public FoodController(IMediator mediator) => _mediator = mediator;

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] CreateFoodRequest request, CancellationToken cancellationToken)
  {
    var result = await _mediator.Send(new CreateFoodCommand(request.Name, request.ExpirationDate, request.FridgeId), cancellationToken);
    return result is null ? BadRequest("Target fridge does not exist.") : CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
  {
    var result = await _mediator.Send(new GetFoodByIdQuery(id), cancellationToken);
    return result is null ? NotFound() : Ok(result);
  }

  [HttpPatch("{id:guid}")]
  public async Task<IActionResult> Update(Guid id, [FromBody] UpdateFoodRequest request, CancellationToken cancellationToken)
  {
    var result = await _mediator.Send(new UpdateFoodCommand(id, request.Name, request.ExpirationDate), cancellationToken);
    return result is null ? NotFound() : Ok(result);
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
  {
    var success = await _mediator.Send(new DeleteFoodCommand(id), cancellationToken);
    return success ? NoContent() : NotFound();
  }
}
