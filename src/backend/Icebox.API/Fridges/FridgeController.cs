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
}