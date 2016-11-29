using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EmbeddedStock.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "EsImages",
                columns: table => new
                {
                    ESImageId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageData = table.Column<byte[]>(nullable: true),
                    ImageMimeType = table.Column<string>(maxLength: 128, nullable: true),
                    Thumbnail = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EsImages", x => x.ESImageId);
                });

            migrationBuilder.CreateTable(
                name: "ComponentTypes",
                columns: table => new
                {
                    ComponentTypeId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AdminComment = table.Column<string>(nullable: true),
                    ComponentInfo = table.Column<string>(nullable: true),
                    ComponentName = table.Column<string>(nullable: true),
                    Datasheet = table.Column<string>(nullable: true),
                    ImageESImageId = table.Column<long>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    Manufacturer = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    WikiLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComponentTypes", x => x.ComponentTypeId);
                    table.ForeignKey(
                        name: "FK_ComponentTypes_EsImages_ImageESImageId",
                        column: x => x.ImageESImageId,
                        principalTable: "EsImages",
                        principalColumn: "ESImageId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CategoryComponentType",
                columns: table => new
                {
                    CategoryId = table.Column<int>(nullable: false),
                    ComponentTypeId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryComponentType", x => new { x.CategoryId, x.ComponentTypeId });
                    table.ForeignKey(
                        name: "FK_CategoryComponentType_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryComponentType_ComponentTypes_ComponentTypeId",
                        column: x => x.ComponentTypeId,
                        principalTable: "ComponentTypes",
                        principalColumn: "ComponentTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Components",
                columns: table => new
                {
                    ComponentId = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AdminComment = table.Column<string>(nullable: true),
                    ComponentNumber = table.Column<int>(nullable: false),
                    ComponentTypeId = table.Column<long>(nullable: false),
                    CurrentLoanInformationId = table.Column<long>(nullable: true),
                    SerialNo = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    UserComment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Components", x => x.ComponentId);
                    table.ForeignKey(
                        name: "FK_Components_ComponentTypes_ComponentTypeId",
                        column: x => x.ComponentTypeId,
                        principalTable: "ComponentTypes",
                        principalColumn: "ComponentTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryComponentType_ComponentTypeId",
                table: "CategoryComponentType",
                column: "ComponentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Components_ComponentTypeId",
                table: "Components",
                column: "ComponentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ComponentTypes_ImageESImageId",
                table: "ComponentTypes",
                column: "ImageESImageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryComponentType");

            migrationBuilder.DropTable(
                name: "Components");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "ComponentTypes");

            migrationBuilder.DropTable(
                name: "EsImages");
        }
    }
}
