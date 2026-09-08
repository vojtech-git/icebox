using Microsoft.AspNetCore.Mvc;
using Icebox.Application.Fridges;
using MediatR;

namespace Icebox.API.Fridges;

[ApiController]
[Route("api/[controller]")]
public class FridgeController : ControllerBase
{
  private readonly IMediator _mediator;
  public FridgeController(IMediator mediator) => _mediator = mediator;

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] CreateFridgeRequest request, CancellationToken cancellationToken)
  {
    var result = await _mediator.Send(new CreateFridgeCommand(request.Name), cancellationToken);
    return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
  }

  [HttpGet]
  public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
  {
    var result = await _mediator.Send(new GetAllFridgesQuery(), cancellationToken);
    return Ok(result);
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
  {
    var result = await _mediator.Send(new GetFridgeByIdQuery(id), cancellationToken);
    return result is null ? NotFound() : Ok(result);
  }

  [HttpPatch("{id:guid}")]
  public async Task<IActionResult> Update(Guid id, [FromBody] UpdateFridgeRequest request, CancellationToken cancellationToken)
  {
    var result = await _mediator.Send(new UpdateFridgeCommand(id, request.Name), cancellationToken);
    return result is null ? NotFound() : Ok(result);
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
  {
    var success = await _mediator.Send(new DeleteFridgeCommand(id), cancellationToken);
    return success ? NoContent() : NotFound();
  }
}
