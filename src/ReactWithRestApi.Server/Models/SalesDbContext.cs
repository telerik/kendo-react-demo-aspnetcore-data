#nullable disable
using CommonHelpers.Services;
using Microsoft.EntityFrameworkCore;

namespace ReactWithRestApi.Server.Models;

public class SalesDbContext(DbContextOptions<SalesDbContext> options) : DbContext(options)
{
    public virtual DbSet<CustomerEntity> Customers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CustomerEntity>()
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<CustomerEntity>()
            .HasData(GenerateInitialSampleData());

        base.OnModelCreating(modelBuilder);
    }

    // This only runs the first time the db is created, it creates sample customers.
    private static IEnumerable<CustomerEntity> GenerateInitialSampleData()
    {
        var people = SampleDataService.Current.GeneratePeopleData(true).ToList();

        var customers = new List<CustomerEntity>();

        for (var i = 0; i < people.Count - 1; i++)
        {
            customers.Add(new CustomerEntity
            {
                Id= Convert.ToUInt32(i+1),
                Name = people[i].Name, 
                Age = people[i].Age, 
                DateOfBirth = people[i].DateOfBirth
            });
        }

        return customers;
    }
}