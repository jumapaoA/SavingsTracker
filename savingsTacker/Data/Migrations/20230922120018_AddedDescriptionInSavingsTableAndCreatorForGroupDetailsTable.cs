using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace savingsTacker.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedDescriptionInSavingsTableAndCreatorForGroupDetailsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Savings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GroupCreator",
                table: "GroupDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Savings");

            migrationBuilder.DropColumn(
                name: "GroupCreator",
                table: "GroupDetails");
        }
    }
}
