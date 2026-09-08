namespace Icebox.API.Foods;

public record CreateFoodRequest(string Name, DateTime ExpirationDate, Guid FridgeId);
