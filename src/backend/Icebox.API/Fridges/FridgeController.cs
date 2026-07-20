using Microsoft.AspNetCore.Mvc;
using Icebox.Application.Fridges;
using MediatR;

namespace Icebox.API.Fridges;

[ApiController]
[Route("api/[controller]")]
public class FridgeController : ControllerBase
{
    private readonly IMediator _mediator;

    public FridgeController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateFridgeCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetAll), new { id = result.Id }, result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new GetAllFridgesQuery());
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetFridgeByIdQuery(id));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateFridgeRequest request)
    {
        var result = await _mediator.Send(new UpdateFridgeCommand(id, request.Name));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _mediator.Send(new DeleteFridgeCommand(id));
        return success ? NoContent() : NotFound();
    }
}