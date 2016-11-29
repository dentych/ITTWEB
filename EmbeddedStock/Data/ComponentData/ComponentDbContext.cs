using Microsoft.EntityFrameworkCore;
using WebApplication.Models;

namespace WebApplication.Data
{
    public class ComponentDbContext : DbContext
    {
        public ComponentDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
//            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>()
                .HasMany(c => c.ComponentTypes);

            modelBuilder.Entity<ComponentType>()
                .HasMany(ct => ct.Categories);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<ComponentType> ComponentTypes { get; set; }
        public DbSet<Component> Components { get; set; }
        public DbSet<ESImage> EsImages { get; set; }
    }
}