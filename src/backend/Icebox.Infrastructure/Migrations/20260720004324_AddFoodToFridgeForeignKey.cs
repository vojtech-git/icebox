using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Icebox.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddFoodToFridgeForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Foods_FridgeId",
                table: "Foods",
                column: "FridgeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_Fridges_FridgeId",
                table: "Foods",
                column: "FridgeId",
                principalTable: "Fridges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Foods_Fridges_FridgeId",
                table: "Foods");

            migrationBuilder.DropIndex(
                name: "IX_Foods_FridgeId",
                table: "Foods");
        }
    }
}
