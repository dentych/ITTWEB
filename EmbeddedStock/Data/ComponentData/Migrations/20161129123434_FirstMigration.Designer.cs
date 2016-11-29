using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using WebApplication.Data;
using WebApplication.Models;

namespace EmbeddedStock.Migrations
{
    [DbContext(typeof(ComponentDbContext))]
    [Migration("20161129123434_FirstMigration")]
    partial class FirstMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752");

            modelBuilder.Entity("WebApplication.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("WebApplication.Models.CategoryComponentType", b =>
                {
                    b.Property<int>("CategoryId");

                    b.Property<long>("ComponentTypeId");

                    b.HasKey("CategoryId", "ComponentTypeId");

                    b.HasIndex("ComponentTypeId");

                    b.ToTable("CategoryComponentType");
                });

            modelBuilder.Entity("WebApplication.Models.Component", b =>
                {
                    b.Property<long>("ComponentId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdminComment");

                    b.Property<int>("ComponentNumber");

                    b.Property<long>("ComponentTypeId");

                    b.Property<long?>("CurrentLoanInformationId");

                    b.Property<string>("SerialNo");

                    b.Property<int>("Status");

                    b.Property<string>("UserComment");

                    b.HasKey("ComponentId");

                    b.HasIndex("ComponentTypeId");

                    b.ToTable("Components");
                });

            modelBuilder.Entity("WebApplication.Models.ComponentType", b =>
                {
                    b.Property<long>("ComponentTypeId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdminComment");

                    b.Property<string>("ComponentInfo");

                    b.Property<string>("ComponentName");

                    b.Property<string>("Datasheet");

                    b.Property<long?>("ImageESImageId");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Location");

                    b.Property<string>("Manufacturer");

                    b.Property<int>("Status");

                    b.Property<string>("WikiLink");

                    b.HasKey("ComponentTypeId");

                    b.HasIndex("ImageESImageId");

                    b.ToTable("ComponentTypes");
                });

            modelBuilder.Entity("WebApplication.Models.ESImage", b =>
                {
                    b.Property<long>("ESImageId")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("ImageData");

                    b.Property<string>("ImageMimeType")
                        .HasMaxLength(128);

                    b.Property<byte[]>("Thumbnail");

                    b.HasKey("ESImageId");

                    b.ToTable("EsImages");
                });

            modelBuilder.Entity("WebApplication.Models.CategoryComponentType", b =>
                {
                    b.HasOne("WebApplication.Models.Category", "Category")
                        .WithMany("CategoryComponentTypes")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebApplication.Models.ComponentType", "ComponentType")
                        .WithMany("CategoryComponentTypes")
                        .HasForeignKey("ComponentTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebApplication.Models.Component", b =>
                {
                    b.HasOne("WebApplication.Models.ComponentType")
                        .WithMany("Components")
                        .HasForeignKey("ComponentTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebApplication.Models.ComponentType", b =>
                {
                    b.HasOne("WebApplication.Models.ESImage", "Image")
                        .WithMany()
                        .HasForeignKey("ImageESImageId");
                });
        }
    }
}
