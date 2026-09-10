using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Icebox.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveFoodIdsArray : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FoodIds",
                table: "Fridges");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<Guid>>(
                name: "FoodIds",
                table: "Fridges",
                type: "uuid[]",
                nullable: false);
        }
    }
}
