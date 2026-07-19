public class Fridge
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public DateTime DateCreated { get; private set; }
    public List<Guid> FoodIds { get; private set; } = new();

    public Fridge(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Fridge name cannot be empty.", nameof(name));

        Id = Guid.NewGuid();
        Name = name;
        DateCreated = DateTime.UtcNow;
    }
}