namespace Icebox.Application.Foods;

public record FoodResponse(Guid Id, string Name, DateTime ExpirationDate, Guid FridgeId);
