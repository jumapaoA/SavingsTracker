using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace savingsTacker.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedActivityLogTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userId",
                table: "GroupMembers",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "isAdmin",
                table: "GroupMembers",
                newName: "IsAdmin");

            migrationBuilder.RenameColumn(
                name: "groupId",
                table: "GroupMembers",
                newName: "GroupId");

            migrationBuilder.CreateTable(
                name: "ActivityLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateAccess = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityLogs", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityLogs");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "GroupMembers",
                newName: "userId");

            migrationBuilder.RenameColumn(
                name: "IsAdmin",
                table: "GroupMembers",
                newName: "isAdmin");

            migrationBuilder.RenameColumn(
                name: "GroupId",
                table: "GroupMembers",
                newName: "groupId");
        }
    }
}
