using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace PeopleManagementApi.Models
{
    public class PeopleManagementContext : DbContext
    {
        private readonly IConfiguration configuration;

        public PeopleManagementContext(DbContextOptions<PeopleManagementContext> options, IConfiguration configuration) 
        : base(options)
        {
            this.configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(this.configuration.GetConnectionString("PeopleManagementConnection"));
        }
        protected override void OnModelCreating(ModelBuilder modelBilder)
        {
            modelBilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Password = "admin",
                    Email = "admin@gmail.com",   
                    FirstName = "admin",
                    LastName = "admin",
                    IsConfirmed = true,
                }
            );
        }


        public DbSet<Company> Companies { get; set; } = null!;
        public DbSet<Job> Jobs { get; set; } = null!;
        public DbSet<People> People { get; set; } = null!;
        public DbSet<Skill> Skills { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
    }
  
}