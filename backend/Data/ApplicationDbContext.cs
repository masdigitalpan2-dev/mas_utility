using Microsoft.EntityFrameworkCore;
using MASDigitalService.Models;

namespace MASDigitalService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<SalesRecord> SalesRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SalesRecord>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.DayDate).IsRequired();
                entity.Property(e => e.Remarks).HasMaxLength(500);
                entity.HasIndex(e => e.DayDate);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}