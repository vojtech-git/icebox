namespace Icebox.Application.Fridges;

public record FridgeDto(Guid Id, string Name, DateTime DateCreated, List<Guid> FoodIds);