namespace Icebox.Application.Fridges;

using Icebox.Application.Foods;

public record FridgeResponse(Guid Id, string Name, DateTime DateCreated, List<FoodResponse> Foods);
