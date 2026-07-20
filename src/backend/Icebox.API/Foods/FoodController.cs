using Microsoft.AspNetCore.Mvc;
using MediatR;
using Icebox.Application.Foods;

namespace Icebox.API.Foods;

[ApiController]
[Route("api/[controller]")]
public class FoodController : ControllerBase
{
    private readonly IMediator _mediator;

    public FoodController(IMediator mediator) => _mediator = mediator;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateFoodCommand command)
    {
        var result = await _mediator.Send(command);
        return result is null ? BadRequest("Target fridge does not exist.") : CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetFoodByIdQuery(id));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateFoodRequest request)
    {
        var result = await _mediator.Send(new UpdateFoodCommand(id, request.Name, request.ExpirationDate));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _mediator.Send(new DeleteFoodCommand(id));
        return success ? NoContent() : NotFound();
    }
}