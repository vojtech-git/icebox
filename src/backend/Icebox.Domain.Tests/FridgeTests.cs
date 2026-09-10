using Icebox.Domain.Fridges;

namespace Icebox.Domain.Tests;

public class FridgeTests
{
    [Fact]
    public void Constructor_ValidName_CreatesFridge()
    {
        var fridge = new Fridge("Kitchen Fridge");
        
        Assert.Equal("Kitchen Fridge", fridge.Name);
        Assert.NotEqual(Guid.Empty, fridge.Id);
    }

    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    public void Constructor_InvalidName_ThrowsArgumentException(string invalidName)
    {
        Assert.Throws<ArgumentException>(() => new Fridge(invalidName));
    }

    [Fact]
    public void UpdateName_ValidName_UpdatesSuccessfully()
    {
        var fridge = new Fridge("Old Name");
        fridge.UpdateName("New Name");
        
        Assert.Equal("New Name", fridge.Name);
    }
}