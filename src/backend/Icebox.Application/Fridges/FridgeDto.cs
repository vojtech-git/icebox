namespace Icebox.Application.Fridges;

using Icebox.Application.Foods;

public record FridgeDto(Guid Id, string Name, DateTime DateCreated, List<FoodDto> Foods);
