using Icebox.Domain.Foods;

namespace Icebox.Domain.Fridges;

public class Fridge
{
  public Guid Id { get; private set; }
  public string Name { get; private set; }
  public DateTime DateCreated { get; private set; }
  private readonly List<Food> _foods = new();
  public IReadOnlyCollection<Food> Foods => _foods.AsReadOnly();
  public Fridge(string name)
  {
    if (string.IsNullOrWhiteSpace(name))
      throw new ArgumentException("Fridge name cannot be empty.", nameof(name));

    Id = Guid.NewGuid();
    Name = name;
    DateCreated = DateTime.UtcNow;
  }

  public void UpdateName(string newName)
  {
    if (string.IsNullOrWhiteSpace(newName))
      throw new ArgumentException("Fridge name cannot be empty.", nameof(newName));

    Name = newName;
  }
}
