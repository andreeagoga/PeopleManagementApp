using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PeopleManagementApi.Migrations
{
    public partial class CompanyId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Companies_ParentId",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "Jobs",
                newName: "CompId");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_ParentId",
                table: "Jobs",
                newName: "IX_Jobs_CompId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Companies_CompId",
                table: "Jobs",
                column: "CompId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Companies_CompId",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "CompId",
                table: "Jobs",
                newName: "ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_CompId",
                table: "Jobs",
                newName: "IX_Jobs_ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Companies_ParentId",
                table: "Jobs",
                column: "ParentId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
