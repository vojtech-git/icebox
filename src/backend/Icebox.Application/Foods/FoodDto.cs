namespace Icebox.Application.Foods;

public record FoodDto(Guid Id, string Name, DateTime ExpirationDate, Guid FridgeId);