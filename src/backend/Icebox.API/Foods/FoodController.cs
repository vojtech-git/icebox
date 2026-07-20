using Microsoft.AspNetCore.Mvc;
using MediatR;
using Icebox.Application.Foods;

namespace Icebox.API.Controllers;

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
}