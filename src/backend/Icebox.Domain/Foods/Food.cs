namespace Icebox.Domain.Foods;

public class Food
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public DateTime ExpirationDate { get; private set; }
    public Guid FridgeId { get; private set; }

    public Food(string name, DateTime expirationDate, Guid fridgeId)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Food name cannot be empty.", nameof(name));
        
        if (fridgeId == Guid.Empty)
            throw new ArgumentException("Fridge ID must be provided.", nameof(fridgeId));

        Id = Guid.NewGuid();
        Name = name;
        ExpirationDate = expirationDate;
        FridgeId = fridgeId;
    }

    public void UpdateDetails(string name, DateTime expirationDate)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Food name cannot be empty.", nameof(name));

        Name = name;
        ExpirationDate = expirationDate;
    }
}