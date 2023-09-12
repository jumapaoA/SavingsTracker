using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace savingsTacker.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedApplicationUserNullableEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AddressString",
                table: "AspNetUsers",
                newName: "AddressStreet");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AddressStreet",
                table: "AspNetUsers",
                newName: "AddressString");
        }
    }
}
