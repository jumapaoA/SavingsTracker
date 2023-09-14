using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace savingsTacker.Data.Migrations
{
    /// <inheritdoc />
    public partial class SavingsTableUpdatedWithUserUpdatedEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserUpdated",
                table: "Savings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserUpdated",
                table: "Savings");
        }
    }
}
