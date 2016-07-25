using QuestAnsWebServices.DbExtensions;
using QuestAnsWebServices.EF.Info;
using System.Data.Entity;

namespace QuestAnsWebServices.Providers
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {
            Database.SetInitializer(new CreateApplicationDatabaseIfNotExists());
        }

        public DbSet<CityCountry> CitiesCountries { get; set; }

        public DbSet<Country> Countries { get; set; }

        public DbSet<City> Cities { get; set; }
    }
}